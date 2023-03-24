import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: 'Email do usuario' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Nome do usuario' })
  nome?: string;

  @ApiProperty({ description: 'Senha do usuario' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  senha?: string;
}
