import { User } from '@prisma/client';
import { UserDto } from './user.dto';

export const toUserDto = (user: User): UserDto => {
  const { id, email, name } = user;
  const userDto: UserDto = { id, email, name };
  return userDto;
};
