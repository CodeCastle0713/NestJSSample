import { UserRole } from '../enum/role.enum';

export interface JwtPayloadInterface {
  sub: string;
  role: UserRole;
}
