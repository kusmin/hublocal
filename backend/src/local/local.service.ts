import { BadRequestException, Injectable } from '@nestjs/common';
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
        empresa: { connect: { id: this.parseNumber(empresaId) } },
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
        empresaId: empresaId ? this.parseNumber(empresaId) : undefined,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.local.delete({ where: { id } });
  }

  async findAll(empresaId?: string, pagina?: number, limite?: number) {
    const where = empresaId ? { empresaId: this.parseNumber(empresaId) } : {};

    const [locais, total] = await Promise.all([
      this.prisma.local.findMany({
        where,
        skip: pagina && limite ? pagina * limite : undefined,
        take: limite,
      }),
      this.prisma.local.count({ where }),
    ]);

    return { locais, total };
  }

  async countByEmpresa(empresaId: number): Promise<number> {
    const count = await this.prisma.local.count({
      where: {
        empresaId: empresaId,
      },
    });
    return count;
  }

  private parseNumber(value: string): number {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new BadRequestException(`Invalid number: ${value}`);
    }
    return parsed;
  }
}
