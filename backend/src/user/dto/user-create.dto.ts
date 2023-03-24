import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email do usuario' })
  email: string;

  @ApiProperty({ description: 'Nome do usuario' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Senha do usuario' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  senha: string;
}
