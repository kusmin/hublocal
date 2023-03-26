import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/user-create.dto';
import { EditUserDto } from './dto/user-edit.dto';
import { UserDto } from './dto/user.dto';
import { toUserDto } from './dto/user.mapper';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email já cadastrado.');
    }
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    const user = await this.prisma.user.create({
      data: { ...data, senha: hashedPassword },
    });
    return toUserDto(user);
  }

  async findUserById(id: number): Promise<UserDto | null> {
    return toUserDto(await this.prisma.user.findUnique({ where: { id } }));
  }

  async findAllUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(toUserDto);
  }

  async updateUser(id: number, data: EditUserDto): Promise<UserDto> {
    if (data.senha) {
      const hashedPassword = await bcrypt.hash(data.senha, 10);
      data.senha = hashedPassword;
    }
    const user = await this.prisma.user.update({ where: { id }, data });
    return toUserDto(user);
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    const { senha, ...rest } = user;
    return { ...rest, senha };
  }

  async deleteUser(id: number): Promise<UserDto> {
    return toUserDto(await this.prisma.user.delete({ where: { id } }));
  }
}
