import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BasicAuthGuard } from '../basic.guard';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { EditUserDto } from './dto/user.edit.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(BasicAuthGuard)
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.findUserById(Number(id));
  }

  @UseGuards(BasicAuthGuard)
  @Get()
  async findAllUsers(): Promise<UserDto[]> {
    return this.userService.findAllUsers();
  }

  @UseGuards(BasicAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: EditUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.deleteUser(Number(id));
  }
}
