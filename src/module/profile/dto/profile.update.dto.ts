import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { Message } from '../enum/message.enum';

const MIN_PASSWORD_LENGTH = 6;

export class UserUpdateDto {
  @IsEmail({}, { message: Message.InvalidEmailFormat })
  @IsOptional()
  email: string;

  @MinLength(MIN_PASSWORD_LENGTH, {
    message: Message.MinPassword,
  })
  @IsOptional()
  password: string;

  @IsOptional()
  username: string;
}
