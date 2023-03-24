import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'Username do usuario' })
  readonly username: string;

  @IsString()
  @ApiProperty({ description: 'senha do usuario' })
  readonly password: string;
}
