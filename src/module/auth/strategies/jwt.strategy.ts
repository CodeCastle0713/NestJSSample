import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from 'src/module/user/user.service';
import { ConfigService } from '@nestjs/config';
import { Message } from '../enum/message.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private propsToSelect = '-password';

  constructor(
    private userService: UserService,
    configService: ConfigService,
  ) {
    const { secret } = configService.get('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  //Called by @UseGuard(JwtAuthGuard)
  async validate(payload: any) {
    const user = await this.userService
      .findById(payload.sub)
      .select(this.propsToSelect);

    if (!user) {
      throw new UnauthorizedException({ message: Message.NoUser });
    }

    return user; // This will be attached to `req.user`
  }
}
