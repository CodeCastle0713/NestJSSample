import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
    imports:[UserModule],
    controllers : [AuthController],
    providers : [AuthService],
    exports:[AuthService]
})
export class AuthModule {}
