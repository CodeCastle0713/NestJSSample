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
} from '@nestjs/common';

import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/issue.dto';
import { Issue } from './schema/issue.schema';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { StatusType } from './enum/status.enum';

@UseGuards(JwtAuthGuard)
@Controller('api/issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Post()
  async create(@Body() body: CreateIssueDto, @Request() req) {
    const { userId } = req.user;
    return await this.issueService.add({ ...body, creator: userId });
  }

  @Get()
  async list(): Promise<Issue[] | null> {
    return await this.issueService.findAll();
  }

  @Get(':id')
  retrieve(@Param() param: any) {
    return this.issueService.findById(param.id);
  }

  @Patch(':id/closeStatus')
  updateStatusToClose(@Param() param: any) {
    return this.issueService.updateStatus(param.id, StatusType.Closed);
  }

  @Patch(':id/openStatus')
  updateStatusToOpen(@Param() param: any) {
    return this.issueService.updateStatus(param.id, StatusType.Open);
  }

  @Delete(':id')
  delete(@Param() param: any) {
    return this.issueService.deleteById(param.id);
  }
}
