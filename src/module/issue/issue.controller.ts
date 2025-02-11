import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { UserRequest } from '../user/interface/user.request';

import { IssueCreateDto } from './dto/issue.create.dto';
import { IssueUpdateDto } from './dto/issue.update.dto';
import { Message } from './enum/message.enum';
import { IssueStatus } from './enum/status.enum';
import { IssueService } from './issue.service';

@UseGuards(JwtAuthGuard)
@Controller('api/issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Post()
  async create(@Body() body: IssueCreateDto, @Req() { user }: UserRequest) {
    await this.issueService.save({ ...body, creator: user.id });

    return {
      message: Message.SuccessCreate,
    };
  }

  @Get()
  async list() {
    const issues = await this.issueService.find();

    if (!issues) {
      throw new NotFoundException({ message: Message.NoIssue });
    }

    return issues;
  }

  @Get(':id')
  async retrieve(@Param() { id }) {
    const issue = await this.issueService.findById(id);

    if (!issue) {
      throw new NotFoundException({ message: Message.NoIssue });
    }

    return issue;
  }

  @Put(':id')
  async update(@Param() { id }, @Body() payload: IssueUpdateDto) {
    const issue = await this.issueService.findById(id);
    if (!issue) {
      throw new NotFoundException({ message: Message.NoIssue });
    }

    await issue.updateOne({ $set: payload });

    return {
      message: Message.SuccessUpdate,
    };
  }

  @Patch(':id/close')
  async updateStatusToClose(@Param() { id }) {
    const issue = await this.issueService.findById(id);

    if (!issue) {
      throw new NotFoundException({ message: Message.NoIssue });
    }

    return this.issueService.updateStatus(id, IssueStatus.Closed);
  }

  @Patch(':id/open')
  async updateStatusToOpen(@Param() { id }) {
    const issue = await this.issueService.findById(id);

    if (!issue) {
      throw new NotFoundException({ message: Message.NoIssue });
    }

    return this.issueService.updateStatus(id, IssueStatus.Open);
  }

  @Delete(':id')
  async delete(@Param() { id }) {
    const issue = await this.issueService.findById(id);

    if (!issue) {
      throw new NotFoundException({ message: Message.NoIssue });
    }

    await issue.deleteOne();

    return {
      message: Message.SuccessDelete,
    };
  }
}
