import { Controller, Post, Body, Res, HttpStatus, UseFilters, ValidationPipe, HttpCode } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from 'src/user/dtos/user.dto';
import { HttpExceptionFilter } from 'src/common/exceptionFilter/exception.filter';
import { User } from 'src/user/schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ) {}

    @Post('/register')
    @UseFilters(new HttpExceptionFilter())
    async register(@Body(new ValidationPipe()) registerUserDto: RegisterUserDto, @Res() res:Response): Promise<Response>{
       const newUser = this.authService.register(registerUserDto);
       return res.status(HttpStatus.OK).json(newUser);
    }

    @Post('/login')
    @UseFilters(new HttpExceptionFilter())
    async login(@Body(new ValidationPipe()) loginUserDto:LoginUserDto, @Res() res:Response): Promise<Response> {
        const user = this.authService.login(loginUserDto)
        return res.status(HttpStatus.OK).json(user);
    }
}
