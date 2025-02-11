
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/module/user/user.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Message } from '../enum/message.enum';
import { JwtPayloadInterface } from '../interface/jwt.payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private propsToSelect = '-password';

  constructor(
    private userService: UserService,
    configService: ConfigService
  ) {
    const { secret } = configService.get('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  // Called by @UseGuard(JwtAuthGuard)
  async validate(payload: JwtPayloadInterface) {
    const user = await this.userService
      .findById(payload.sub)
      .select(this.propsToSelect);

    if (!user) {
      throw new UnauthorizedException({ message: Message.NoUser });
    }

    return user; // Attached to `req.user`
  }
}
