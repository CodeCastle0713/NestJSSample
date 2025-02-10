import {
  Controller,
  Param,
  Delete,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  NotFoundException,
  Put,
} from '@nestjs/common';

import { IssueService } from './issue.service';
import { IssueCreateDto } from './dto/issue.create.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { IssueStatus } from './enum/status.enum';
import { Message } from './enum/message.enum';
import { IssueUpdateDto } from './dto/issue.update.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Post()
  async create(@Body() body: IssueCreateDto, @Request() req) {
    const { id } = req.user;

    await this.issueService.save({ ...body, creator: id });

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
