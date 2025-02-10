import { IsEmail, IsOptional } from 'class-validator';
import { Message } from '../enum/message.enum';

export class ProfileUpdateDto {
  @IsEmail({}, { message: Message.InvalidEmailFormat })
  @IsOptional()
  email: string;

  @IsOptional()
  fullname: string;
}
