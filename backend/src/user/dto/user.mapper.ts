import { User } from '@prisma/client';
import { UserDto } from './user.dto';

export const toUserDto = (user: User): UserDto => {
  const { id, email, nome } = user;
  const userDto: UserDto = { id, email, nome };
  return userDto;
};
