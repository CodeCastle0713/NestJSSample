import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { Message } from './enum/message.enum';
import { UserService } from '../user/user.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(@Body() body: UserRegisterDto) {
    const user = await this.userService.findByEmail(body.email);

    if (user) {
      throw new UnprocessableEntityException({
        message: Message.ExistingUser,
      });
    }

    await this.userService.save(body);

    return {
      message: Message.SuccessRegister,
    };
  }

  @Post('/login')
  async login(@Body() body: UserLoginDto) {
    const user = await this.userService.findByEmail(body.email);

    if (!user || !(await user.comparePassword(body.password))) {
      throw new UnauthorizedException({
        message: Message.InvalidCredential,
      });
    }

    const accessToken = this.authService.signPayload(user);

    return { accessToken };
  }
}
