import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../enum/role.enum';
import { compare, genSaltSync, hashSync } from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.User })
  role: UserRole;

  async comparePassword(enteredPassword: string): Promise<boolean> {
    return compare(enteredPassword, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', function () {
  this.password = hashSync(this.password, genSaltSync(10));
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return compare(enteredPassword, this.password);
};
