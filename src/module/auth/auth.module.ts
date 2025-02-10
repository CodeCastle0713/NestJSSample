import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt.auth.guard';
import { LocalAuthGuard } from './guard/local.auth.guard';
import { LocalStrategy } from './strategy/local.strategy';
@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        const { secret, expiresIn } = configService.get('jwt');
        return { secret, signOptions: { expiresIn } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
    LocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
