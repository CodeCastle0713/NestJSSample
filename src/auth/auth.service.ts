import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto, LoginUserDto } from 'src/user/dtos/user.dto';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService:UserService){}

    async register(registerUserDto:RegisterUserDto): Promise<User | null>{
        const existingUser = await this.userService.find(registerUserDto.email);
        if(existingUser)
            throw new BadRequestException("You already registered");
        else{
            const addedUser = await this.userService.add({...registerUserDto, password:await this.hashPassword(registerUserDto.password)});
            return addedUser;
        }
    }

    async login(loginUserDto:LoginUserDto): Promise<User | null>{
        const existingUser = await this.userService.find(loginUserDto.email);
        if(existingUser && await this.comparePasswords(loginUserDto.password, existingUser.password))
            return existingUser;
        else
            throw new BadRequestException("Invalid credentials");
    }

    async hashPassword(password:string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
