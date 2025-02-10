import {
  Controller,
  Param,
  Delete,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorator/role.decorator';
import { UserRole } from '../auth/enum/role.enum';
import { Message } from './enum/message.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Admin)
@Controller('api/user')
export class UserController {
  private propsToSelect = '-password';

  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() body: UserCreateDto) {
    const user = await this.userService
      .findByEmail(body.email)
      .select(this.propsToSelect);

    if (user) {
      throw new UnprocessableEntityException({ message: Message.ExistingUser });
    }

    await this.userService.save(body);

    return {
      message: Message.SuccessCreate,
    };
  }

  @Get()
  async list() {
    const users = await this.userService.find().select(this.propsToSelect);

    if (!users) {
      throw new NotFoundException({ message: Message.NoUser });
    }

    return users;
  }

  @Get(':id')
  async retrieve(@Param() { id }) {
    const user = await this.userService.findById(id).select(this.propsToSelect);

    if (!user) {
      throw new NotFoundException({ message: Message.NoUser });
    }

    return user;
  }

  @Put(':id')
  async update(@Param() { id }, @Body() payload: UserUpdateDto) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException({ message: Message.NoUser });
    }

    await user.updateOne({ $set: payload });

    return {
      message: Message.SuccessUpdate,
    };
  }

  @Delete(':id')
  async delete(@Param() { id }) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException({ message: Message.NoUser });
    }

    await user.deleteOne();

    return {
      message: Message.SuccessDelete,
    };
  }
}
