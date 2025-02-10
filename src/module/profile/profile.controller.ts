import {
  Controller,
  Get,
  Request,
  UseGuards,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { ProfileUpdateDto } from './dto/profile.update.dto';
import { Message } from './enum/message.enum';
import { User } from '../user/schema/user.schema';

@Controller('api/profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  @Get()
  async retrieve(@Request() user: User) {
    return user;
  }

  @Put()
  async update(@Body() payload: ProfileUpdateDto, @Request() user: User) {
    await user.updateOne({ $set: payload });

    return {
      message: Message.SuccessUpdate,
    };
  }

  @Delete('close')
  async delete(@Request() user: User) {
    await user.deleteOne();

    return {
      message: Message.SuccessDelete,
    };
  }
}
