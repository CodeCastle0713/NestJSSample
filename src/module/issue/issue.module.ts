import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';

import { Issue, IssueSchema } from './schema/issue.schema';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: Issue.name,
        schema: IssueSchema,
      },
    ]),
  ],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
