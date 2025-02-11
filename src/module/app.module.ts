import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { IssueModule } from './issue/issue.module';
import { ProfileModule } from './profile/profile.module';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const { uri } = configService.get('database');

        function onConnectionCreate(connection: Connection) {
          connection.on('connected', () => console.log('DB is connected'));
          connection.on('open', () => console.log('DB is opened'));
          connection.on('disconnected', () =>
            console.log('DB is disconnected')
          );
          connection.on('reconnected', () => console.log('DB is reconnected'));
          connection.on('disconnecting', () =>
            console.log('DB is disconnecting')
          );
          return connection;
        }

        return {
          uri,
          connectionFactory: onConnectionCreate,
        };
      },
    }),
    AuthModule,
    UserModule,
    IssueModule,
    ProfileModule,
  ],
})
export class AppModule {}
