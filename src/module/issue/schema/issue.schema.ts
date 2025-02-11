import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IssueStatus } from '../enum/status.enum';

@Schema({
  timestamps: true,
  virtuals: true,
})
export class Issue extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false, default: null })
  assignee: string;

  @Prop({ required: true })
  creator: string;

  @Prop({ required: true, enum: IssueStatus, default: IssueStatus.Open })
  status: IssueStatus;

  createdAt: string;
  updatedAt: string;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);
