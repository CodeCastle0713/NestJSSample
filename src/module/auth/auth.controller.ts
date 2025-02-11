import {
  Body,
  Controller,
  Post,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';

import { UserRequest } from '../user/interface/user.request';
import { UserService } from '../user/user.service';

import { UserRegisterDto } from './dto/user.register.dto';
import { Message } from './enum/message.enum';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('/register')
  async register(@Body() body: UserRegisterDto) {
    const user = await this.userService.findByEmail(body.email);
    if (user)
      throw new UnprocessableEntityException({ message: Message.ExistingUser });

    await this.userService.save(body);
    return { message: Message.SuccessRegister };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() { user }: UserRequest) {
    return this.authService.login(user);
  }
}
