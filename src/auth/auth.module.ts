import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';

@Module({
    imports:[
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        })
    ],
    controllers : [AuthController],
    providers : [AuthService],
    exports:[AuthService]
})
export class AuthModule {}
