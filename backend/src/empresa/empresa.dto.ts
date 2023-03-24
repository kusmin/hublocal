import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome da empresa' })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'website da empresa' })
  website: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'cnpj da empresa' })
  cnpj: string;
}

export class UpdateEmpresaDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Nome da empresa' })
  nome?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'website da empresa' })
  website?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'cnpj da empresa' })
  cnpj?: string;
}
