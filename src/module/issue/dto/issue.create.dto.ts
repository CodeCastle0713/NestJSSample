import { IsNotEmpty, IsOptional } from 'class-validator';
import { Message } from '../enum/message.enum';

export class IssueCreateDto {
  @IsNotEmpty({ message: Message.RequireTitle })
  title: string;

  @IsNotEmpty({ message: Message.RequireDescription })
  description: string;

  @IsOptional()
  assignee: string;
}
