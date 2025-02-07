import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Message } from '../enum/message.enum';

const MIN_PASSWORD_LENGTH = 6;

export class UserRegisterDto {
  @IsNotEmpty({ message: Message.RequireEmail })
  username: string;

  @IsEmail({}, { message: Message.InvalidEmailFormat })
  @IsNotEmpty({ message: Message.RequireEmail })
  email: string;

  @MinLength(MIN_PASSWORD_LENGTH, {
    message: Message.MinPassword,
  })
  @IsNotEmpty({ message: Message.RequirePassword })
  password: string;
}
