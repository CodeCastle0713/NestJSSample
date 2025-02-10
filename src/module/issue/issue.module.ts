import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { Issue, IssueSchema } from './schema/issue.schema';
import { UserModule } from '../user/user.module';

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
