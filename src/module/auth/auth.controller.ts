import { Controller, Get, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from '../user/dto/user.dto';
import { MessageType } from './enum/message.enum';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterUserDto) {
    await this.authService.register(body);

    return {
      message: MessageType.SuccessRegister,
    };
  }

  @Post('/login')
  async login(
    @Body() body: LoginUserDto,
  ): Promise<{ accessToken: string } | null> {
    const accessToken = await this.authService.login(body);
    return accessToken;
  }
}
