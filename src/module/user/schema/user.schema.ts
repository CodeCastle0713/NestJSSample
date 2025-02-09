import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../../auth/enum/role.enum';
import { compare, genSaltSync, hashSync } from 'bcrypt';

@Schema({
  timestamps: true,
  virtuals: true,
})
export class User extends Document {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.User })
  role: UserRole;

  createdAt: string;
  updatedAt: string;

  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', function () {
  this.password = hashSync(this.password, genSaltSync(10));
});

UserSchema.pre('updateOne', function () {
  const update = this.getUpdate() as Record<string, any>;

  if (update.password) {
    update.password = hashSync(update.password, genSaltSync(10));
  } else if (update.$set && update.$set.password) {
    update.$set.password = hashSync(update.$set.password, genSaltSync(10));
  }
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return compare(candidatePassword, this.password);
};
