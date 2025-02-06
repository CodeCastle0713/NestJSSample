import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StatusType } from '../enum/status.enum';

@Schema()
export class Issue extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  assignee: string[];

  @Prop({ required: true })
  creator: string;

  @Prop({ required: true, enum: StatusType, default: StatusType.Open })
  status: StatusType;
}

export const IssueSchema = SchemaFactory.createForClass(Issue);
