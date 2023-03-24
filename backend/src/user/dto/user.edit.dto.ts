import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
