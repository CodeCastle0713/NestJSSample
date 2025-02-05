import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from './schemas/user.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}]), 
    ],
    controllers : [UserController],
    providers : [UserService],
    exports:[UserService, MongooseModule]
})
export class UserModule {}
