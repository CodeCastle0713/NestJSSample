import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { UserRequest } from '../user/interface/user.request';

import { ProfileUpdateDto } from './dto/profile.update.dto';
import { Message } from './enum/message.enum';

@Controller('api/profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  @Get()
  retrieve(@Req() { user }: UserRequest) {
    return user;
  }

  @Put()
  async update(
    @Body() payload: ProfileUpdateDto,
    @Req() { user }: UserRequest
  ) {
    await user.updateOne({ $set: payload });

    return {
      message: Message.SuccessUpdate,
    };
  }

  @Delete('close')
  async delete(@Req() { user }: UserRequest) {
    await user.deleteOne();

    return {
      message: Message.SuccessDelete,
    };
  }
}
