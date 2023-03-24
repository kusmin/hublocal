import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmpresaDto, UpdateEmpresaDto } from './empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {}

  async create(createEmpresaDto: CreateEmpresaDto, userId: number) {
    const empresaWithSameCnpj = await this.prisma.empresa.findUnique({
      where: { cnpj: createEmpresaDto.cnpj },
    });

    if (empresaWithSameCnpj) {
      throw new BadRequestException('CNPJ já registrado por outra empresa');
    }
    return await this.prisma.empresa.create({
      data: { ...createEmpresaDto, usuario: { connect: { id: userId } } },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.empresa.findMany({
      where: { usuarioId: userId },
    });
  }

  async findOne(id: number, userId: number) {
    await this.validateUser(userId, id);
    return await this.prisma.empresa.findUnique({ where: { id } });
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto, userId: number) {
    await this.validateUser(userId, id);

    const empresa = await this.prisma.empresa.findUnique({
      where: { id },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    if (updateEmpresaDto.cnpj && updateEmpresaDto.cnpj !== empresa.cnpj) {
      const empresaWithSameCnpj = await this.prisma.empresa.findUnique({
        where: { cnpj: updateEmpresaDto.cnpj },
      });

      if (empresaWithSameCnpj) {
        throw new BadRequestException('CNPJ já registrado por outra empresa');
      }
    }

    return await this.prisma.empresa.update({
      where: { id },
      data: { ...updateEmpresaDto },
    });
  }

  async remove(id: number, userId: number) {
    await this.validateUser(userId, id);

    return await this.prisma.empresa.delete({
      where: { id },
    });
  }

  async validateUser(userId: number, empresaId: number) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: empresaId },
      select: { usuarioId: true },
    });

    if (empresa.usuarioId !== userId) {
      throw new UnauthorizedException('Usuário não autorizado');
    }
  }
}
