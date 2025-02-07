import { IsOptional } from 'class-validator';

export class IssueUpdateDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  assignee: string;

  @IsOptional()
  status: string;
}
