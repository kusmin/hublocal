import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { validate, Validate } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/user-create.dto';
import { EditUserDto } from './dto/user-edit.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Validate(CreateUserDto)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const errors = await validate(createUserDto);

      if (errors.length > 0) {
        throw new HttpException(
          { message: 'Validation failed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.findUserById(Number(id));
  }

  @Get()
  async findAllUsers(): Promise<UserDto[]> {
    return this.userService.findAllUsers();
  }

  @Validate(EditUserDto)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: EditUserDto,
  ) {
    const errors = await validate(updateUserDto);

    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.deleteUser(Number(id));
  }
}
