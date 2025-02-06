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
} from '@nestjs/common';

import { UserService } from './user.service';
import { RegisterUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './schema/user.schema';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { Roles } from './decorator/user.decorator';
import { UserRole } from './enum/role.enum';
import { RolesGuard } from './guard/user.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(UserRole.Admin)
  @Post()
  async create(@Body() body: RegisterUserDto): Promise<User | null> {
    return await this.userService.add(body);
  }

  @Get()
  async list(@Request() req) {
    const { userRole, userId } = req.user;
    if (userRole === UserRole.Admin) {
      return await this.userService.findAll();
    }

    return await this.userService.findById(userId);
  }

  @Get(':id')
  retrieve(@Param() param: any) {
    return this.userService.findById(param.id);
  }

  @Put(':id')
  update(@Param() param: any, @Body() body: UpdateUserDto) {
    return this.userService.updateById(param.id, body);
  }

  @Roles(UserRole.Admin)
  @Delete(':id')
  delete(@Param() param: any) {
    return this.userService.deleteById(param.id);
  }
}
