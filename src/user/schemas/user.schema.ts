import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum UserRole {
    USER = "user",
    ADMIN = "admin",
}

@Schema()
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: UserRole, default:UserRole.USER})
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
