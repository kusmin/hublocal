import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { validate, Validate } from 'class-validator';
import { CreateUserDto } from '../user/dto/user-create.dto';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req, loginDto);
  }

  @Validate(CreateUserDto)
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      const errors = await validate(createUserDto);

      if (errors.length > 0) {
        throw new HttpException(
          { message: 'Validation failed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
