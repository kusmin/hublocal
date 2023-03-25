import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocalDto, UpdateLocalDto } from './local.dto';

@Injectable()
export class LocalService {
  constructor(private prisma: PrismaService) {}

  async create(createLocalDto: CreateLocalDto) {
    const { empresaId, ...data } = createLocalDto;
    return this.prisma.local.create({
      data: {
        ...data,
        empresa: { connect: { id: Number(empresaId) } },
      },
    });
  }

  async findById(id: number) {
    return this.prisma.local.findUnique({ where: { id } });
  }

  async update(id: number, updateLocalDto: UpdateLocalDto) {
    const { empresaId, ...data } = updateLocalDto;
    return this.prisma.local.update({
      where: { id },
      data: {
        ...data,
        empresaId: empresaId ? Number(empresaId) : undefined,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.local.delete({ where: { id } });
  }

  async findAll(empresaId?: string) {
    const filter = empresaId ? { empresaId: Number(empresaId) } : {};
    return this.prisma.local.findMany({ where: filter });
  }
}
