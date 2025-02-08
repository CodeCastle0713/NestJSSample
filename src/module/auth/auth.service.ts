import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  async login(user: any) {
    const payload = { sub: user._id, role: user.role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
