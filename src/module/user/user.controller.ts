import {
  Controller,
  Param,
  Delete,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { Roles } from '../auth/decorator/role.decorator';
import { UserRole } from '../auth/enum/role.enum';
import { RolesGuard } from '../auth/guard/role.guard';
import { Message } from './enum/message.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/user')
export class UserController {
  private propsToSelect = '-password';

  constructor(private userService: UserService) {}

  @Roles(UserRole.Admin)
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
  async list(@Request() req) {
    const { id, role } = req.user;

    const data =
      role === UserRole.Admin
        ? await this.userService.find().select(this.propsToSelect)
        : await this.userService.findById(id).select(this.propsToSelect);

    if (!data) {
      throw new NotFoundException({ message: Message.NoUser });
    }

    return data;
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

  @Roles(UserRole.Admin)
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
