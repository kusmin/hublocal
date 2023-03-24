import { ApiProperty } from '@nestjs/swagger';
import { Local } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class LocalDto {
  @ApiProperty({ description: 'ID do local', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome do local', example: 'Local 1' })
  nome: string;

  @ApiProperty({ description: 'CEP do local', example: '12345-678' })
  cep: string;

  @ApiProperty({ description: 'Rua do local', example: 'Rua A' })
  rua: string;

  @ApiProperty({ description: 'Número do local', example: '123' })
  numero: string;

  @ApiProperty({ description: 'Bairro do local', example: 'Bairro A' })
  bairro: string;

  @ApiProperty({ description: 'Cidade do local', example: 'Cidade A' })
  cidade: string;

  @ApiProperty({ description: 'Estado do local', example: 'Estado A' })
  estado: string;

  @ApiProperty({
    description: 'Data de criação do local',
    example: '2022-03-23T19:20:30Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do local',
    example: '2022-03-23T19:20:30Z',
  })
  updatedAt: Date;

  @ApiProperty({ description: 'identificado da empresa do local' })
  empresa: number;

  static fromEntity(entity: Local) {
    const {
      id,
      nome,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      createdAt,
      updatedAt,
      empresaId,
    } = entity;
    const dto = new LocalDto();
    dto.id = id;
    dto.nome = nome;
    dto.cep = cep;
    dto.rua = rua;
    dto.numero = numero;
    dto.bairro = bairro;
    dto.cidade = cidade;
    dto.estado = estado;
    dto.createdAt = createdAt;
    dto.updatedAt = updatedAt;
    dto.empresa = empresaId;
    return dto;
  }
}

export class CreateLocalDto {
  @ApiProperty({ description: 'Nome do local.' })
  @IsNotEmpty({ message: 'O campo "nome" é obrigatório.' })
  @IsString({ message: 'O campo "nome" deve ser uma string.' })
  @MaxLength(255, {
    message: 'O campo "nome" deve ter no máximo 255 caracteres.',
  })
  nome: string;

  @ApiProperty({ description: 'CEP do local.' })
  @IsNotEmpty({ message: 'O campo "cep" é obrigatório.' })
  @IsString({ message: 'O campo "cep" deve ser uma string.' })
  @MaxLength(8, { message: 'O campo "cep" deve ter no máximo 8 caracteres.' })
  cep: string;

  @ApiProperty({ description: 'Rua do local.' })
  @IsNotEmpty({ message: 'O campo "rua" é obrigatório.' })
  @IsString({ message: 'O campo "rua" deve ser uma string.' })
  @MaxLength(255, {
    message: 'O campo "rua" deve ter no máximo 255 caracteres.',
  })
  rua: string;

  @ApiProperty({ description: 'Número do local.' })
  @IsNotEmpty({ message: 'O campo "numero" é obrigatório.' })
  @IsString({ message: 'O campo "numero" deve ser uma string.' })
  @MaxLength(20, {
    message: 'O campo "numero" deve ter no máximo 20 caracteres.',
  })
  numero: string;

  @ApiProperty({ description: 'Bairro do local.' })
  @IsNotEmpty({ message: 'O campo "bairro" é obrigatório.' })
  @IsString({ message: 'O campo "bairro" deve ser uma string.' })
  @MaxLength(255, {
    message: 'O campo "bairro" deve ter no máximo 255 caracteres.',
  })
  bairro: string;

  @ApiProperty({ description: 'Cidade do local.' })
  @IsNotEmpty({ message: 'O campo "cidade" é obrigatório.' })
  @IsString({ message: 'O campo "cidade" deve ser uma string.' })
  @MaxLength(255, {
    message: 'O campo "cidade" deve ter no máximo 255 caracteres.',
  })
  cidade: string;

  @ApiProperty({ description: 'Estado do local.' })
  @IsNotEmpty({ message: 'O campo "estado" é obrigatório.' })
  @IsString({ message: 'O campo "estado" deve ser uma string.' })
  @MaxLength(2, {
    message: 'O campo "estado" deve ter no máximo 2 caracteres.',
  })
  estado: string;

  @ApiProperty({ description: 'ID da empresa à qual o local pertence.' })
  @IsNotEmpty({ message: 'O campo "empresaId" é obrigatório.' })
  empresaId: number;
}

export class UpdateLocalDto {
  @ApiProperty({ description: 'Nome do local.' })
  @IsOptional()
  @IsString({ message: 'O campo "nome" deve ser uma string.' })
  @MaxLength(255, {
    message: 'O campo "nome" deve ter no máximo 255 caracteres.',
  })
  nome?: string;

  @ApiProperty({ description: 'CEP do local.' })
  @IsOptional()
  @IsString({ message: 'O campo "cep" deve ser uma string.' })
  @MaxLength(8, { message: 'O campo "cep" deve ter no máximo 8 caracteres.' })
  cep?: string;

  @ApiProperty({ description: 'Rua do local.' })
  @IsOptional()
  @IsString({ message: 'O campo "rua" deve ser uma string.' })
  @MaxLength(255, {
    message: 'O campo "rua" deve ter no máximo 255 caracteres.',
  })
  rua?: string;

  @ApiProperty({ description: 'Número do local.' })
  @IsOptional()
  @IsString({ message: 'O campo "numero" deve ser uma string.' })
  @MaxLength(20, {
    message: 'O campo "numero" deve ter no máximo 20 caracteres.',
  })
  numero?: string;

  @ApiProperty({ description: 'Bairro do local.' })
  @IsOptional()
  @IsString({ message: 'O campo "bairro" deve ser uma string.' })
  @MaxLength(255, {
    message: 'O campo "bairro" deve ter no máximo 255 caracteres.',
  })
  bairro?: string;

  @ApiProperty({ description: 'Cidade do local.' })
  @IsOptional()
  @IsString({ message: 'O campo "cidade" deve ser uma string.' })
  @MaxLength(255, {
    message: 'O campo "cidade" deve ter no máximo 255 caracteres.',
  })
  cidade?: string;

  @ApiProperty({ description: 'Estado do local.' })
  @IsOptional()
  @IsString({ message: 'O campo "estado" deve ser uma string.' })
  @MaxLength(2, {
    message: 'O campo "estado" deve ter no máximo 2 caracteres.',
  })
  estado?: string;

  empresaId: number;
}
