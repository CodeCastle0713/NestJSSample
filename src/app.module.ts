import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI as string, {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('DB is connected'));
        connection.on('open', () => console.log('DB is opened'));
        connection.on('disconnected', () => console.log('DB is disconnected'));
        connection.on('reconnected', () => console.log('DB is reconnected'));
        connection.on('disconnecting', () => console.log('DB is disconnecting'));

        return connection;
      },
    }),
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
