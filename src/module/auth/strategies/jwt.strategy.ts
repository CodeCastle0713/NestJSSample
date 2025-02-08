import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from 'src/module/user/user.service';
import { ConfigService } from '@nestjs/config';
import { Message } from '../enum/message.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService,
    configService: ConfigService,
  ) {
    const jwtSecret = configService.get('jwt.secret');

    if (!jwtSecret) {
      throw new Error('JWT Secret is not defined in the environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // Ensure it's not undefined
    });
  }

  //Called by @UseGuard(JwtAuthGuard)
  async validate(payload: any) {
    const user = await this.userService
      .findById(payload.sub)
      .select('-password');

    if (!user) {
      throw new UnauthorizedException({ message: Message.NoUser });
    }

    return user; // This will be attached to `req.user`
  }
}
