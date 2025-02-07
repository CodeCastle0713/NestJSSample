import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signPayload({ _id, role }: User) {
    return this.jwtService.sign({ sub: _id, role });
  }
}
