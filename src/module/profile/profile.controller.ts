import {
  Controller,
  Get,
  Request,
  UseGuards,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { UserUpdateDto } from '../user/dto/user.update.dto';
import { Message } from './enum/message.enum';

@Controller('api/profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private userService: UserService) {}

  @Get()
  async retrieve(@Request() req) {
    const { id } = req.user;
    return await this.userService.findById(id).select('-password');
  }

  @Put()
  async update(@Body() payload: UserUpdateDto, @Request() req) {
    const { id } = req.user;
    const user = await this.userService.findById(id);

    await user?.updateOne({ $set: payload });

    return {
      message: Message.SuccessUpdate,
    };
  }

  @Delete('close')
  async delete(@Request() req) {
    const { id } = req.user;
    const user = await this.userService.findById(id);

    await user?.deleteOne();

    return {
      message: Message.SuccessDelete,
    };
  }
}
