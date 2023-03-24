import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-http';
import { UserService } from './user/user.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException();
    }

    // If the username and password are valid, return the user without the password field.
    const { password: _, ...result } = user;
    return result;
  }
}
