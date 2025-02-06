import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsOptional()
  assignee?: string[] | [];
}
