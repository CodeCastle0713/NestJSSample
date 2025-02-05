import { Controller,Param, Delete, Get, Post, Put, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/user.dto';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {}

    @Post('create')
    async create(@Body() registerUserDto: RegisterUserDto): Promise<User | null>{
        return await this.userService.add(registerUserDto);
    }

    @Get('find')
    async find(email: string): Promise<User | null>{
        return await this.userService.find(email);
    }

    @Get('list')
    async list(): Promise<User[] | null>{
        return await this.userService.findAll();
    }

    @Get(':id/retrieve')
    retrieve(@Param() param:any): string{
        return this.userService.findById(param.id);
    }

    @Put(':id/update')
    update(@Param() param:any): string{
    return this.userService.updateById(param.id);
    }

    @Delete(':id/delete')
    delete(@Param() param:any): string{
        return this.userService.deleteById(param.id);
    }
}
