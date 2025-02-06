import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Issue } from './schema/issue.schema';
import { StatusType } from './enum/status.enum';

@Injectable()
export class IssueService {
  constructor(@InjectModel(Issue.name) private issueModel: Model<Issue>) {}

  async add(createData: any) {
    const newIssue = new this.issueModel(createData);
    return newIssue.save();
  }

  async findAll() {
    const allIssue = await this.issueModel.find().exec();
    return allIssue;
  }

  async findById(id: string) {
    const specificIssue = await this.issueModel.findById(id).exec();
    return specificIssue;
  }

  async updateStatus(id: string, status: StatusType) {
    const updatedIssue = await this.issueModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: status,
        },
      },
      { new: true },
    );

    if (!updatedIssue) {
      throw new NotFoundException({ message: `User with ID ${id} not found` });
    }

    return updatedIssue;
  }
  async deleteById(id: number) {
    const deletedIssue = await this.issueModel.findByIdAndDelete({ _id: id });

    if (!deletedIssue) {
      throw new NotFoundException({ message: `User with ID ${id} not found` });
    }

    return deletedIssue;
  }
}
