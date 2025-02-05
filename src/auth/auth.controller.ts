import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}

    @Post()
    create(): string{
        return "Adding the user";
    }

    @Get()
    getAllUser(): string{
        return "Getting all users";
    }
}
