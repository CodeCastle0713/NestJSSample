import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Issue } from './schema/issue.schema';
import { IssueStatus } from './enum/status.enum';
import { Message } from './enum/message.enum';
import { IssueCreateDto } from './dto/issue.create.dto';

@Injectable()
export class IssueService {
  constructor(@InjectModel(Issue.name) private issueModel: Model<Issue>) {}

  save(createData: IssueCreateDto) {
    return new this.issueModel(createData).save();
  }

  find() {
    return this.issueModel.find();
  }

  findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException({ message: Message.NoIssue });
    }

    return this.issueModel.findById(id);
  }

  async updateStatus(id: string, status: IssueStatus) {
    const updatedIssue = await this.issueModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: status,
        },
      },
      { new: true },
    );

    return updatedIssue;
  }
}
