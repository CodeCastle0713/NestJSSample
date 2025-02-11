import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';

import { Message } from './enum/message.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException({ message: Message.InvalidCredential });
    }
    return user;
  }

  login(user: User) {
    const payload = { sub: user._id, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
