import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { RegisterUserDto, LoginUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MessageType } from './enum/message.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterUserDto) {
    const user = await this.userService.find(body.email);

    if (user) {
      throw new UnprocessableEntityException({
        message: MessageType.ExistingUser,
      });
    }

    return await this.userService.add(body);
  }

  async login(body: LoginUserDto) {
    const user = await this.userService.find(body.email);

    if (!user) {
      throw new UnauthorizedException({
        message: MessageType.InvalidCredential,
      });
    }

    const isPasswordCorrect = await user.comparePassword(body.password);

    if (isPasswordCorrect) {
      const payload = { sub: user._id, role: user.role };
      return { accessToken: await this.jwtService.signAsync(payload) };
    }

    throw new UnauthorizedException({ message: MessageType.InvalidCredential });
  }
}
