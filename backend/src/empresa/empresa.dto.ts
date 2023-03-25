import { ApiProperty } from '@nestjs/swagger';
import { Empresa } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LocalDto } from 'src/local/local.dto';

export class CreateEmpresaDto {
  @ApiProperty({ example: 'Minha Empresa', description: 'Nome da empresa' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    example: 'https://minha-empresa.com.br',
    description: 'Website da empresa',
  })
  @IsNotEmpty()
  @IsString()
  website: string;

  @ApiProperty({
    example: '00.000.000/0000-00',
    description: 'CNPJ da empresa',
  })
  @IsNotEmpty()
  @IsString()
  cnpj: string;
}

export class UpdateEmpresaDto {
  @ApiProperty({ example: 'Minha Empresa', description: 'Nome da empresa' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nome?: string;

  @ApiProperty({
    example: 'https://minha-empresa.com.br',
    description: 'Website da empresa',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  website?: string;

  @ApiProperty({
    example: '00.000.000/0000-00',
    description: 'CNPJ da empresa',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  cnpj?: string;
}

export class EmpresaDto {
  @ApiProperty({ example: 1, description: 'ID da empresa' })
  id: number;

  @ApiProperty({ example: 'Minha Empresa', description: 'Nome da empresa' })
  nome: string;

  @ApiProperty({
    example: 'https://minha-empresa.com.br',
    description: 'Website da empresa',
  })
  website: string;

  @ApiProperty({
    example: '00.000.000/0000-00',
    description: 'CNPJ da empresa',
  })
  cnpj: string;

  @ApiProperty({
    example: '2022-03-23T19:20:30Z',
    description: 'Data de criação da empresa',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-03-23T19:20:30Z',
    description: 'Data de atualização da empresa',
  })
  updatedAt: Date;

  @ApiProperty({
    type: [LocalDto],
    description: 'Lista de locais da empresa',
  })
  locais: LocalDto[];

  @ApiProperty({
    example: 0,
    description: 'Número total de locais da empresa',
  })
  qtTotalLocais: number;

  static fromEntity(entity: Empresa, locais: LocalDto[] = []) {
    const { id, nome, website, cnpj, createdAt, updatedAt } = entity;
    const dto = new EmpresaDto();
    dto.id = id;
    dto.nome = nome;
    dto.website = website;
    dto.cnpj = cnpj;
    dto.createdAt = createdAt;
    dto.updatedAt = updatedAt;
    dto.locais = locais;
    dto.qtTotalLocais = locais.length;

    return dto;
  }
}
