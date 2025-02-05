import { Controller, Get, Post, Body, Res, HttpStatus, UseFilters, ValidationPipe, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from 'src/user/dtos/user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ) {}

    @Post('/register')
    async register(@Body() registerUserDto: RegisterUserDto, @Res() res:Response): Promise<Response>{
        try{
            const newUser = await this.authService.register(registerUserDto);
            return res.status(HttpStatus.OK).json(newUser);
        }catch(err){
            return res.status(err.status).json(err.response);
        }
    }

    @Post('/login')
    async login(@Body() loginUserDto:LoginUserDto, @Res() res:Response): Promise<Response> {
        try{
            const user = await this.authService.login(loginUserDto)
            return res.status(HttpStatus.OK).json(user);
        }catch(err){
            return res.status(err.status).json(err.response);
        }
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile() {
        return "Here is Protected Endpoint - /auth/profile";
    }
}
