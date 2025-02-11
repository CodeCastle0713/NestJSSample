import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
  UseGuards,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from './dto/user.register.dto';
import { Message } from './enum/message.enum';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { UserRequest } from '../user/interface/user.request';

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
