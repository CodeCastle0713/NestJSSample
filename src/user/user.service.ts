import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel:Model<User>,
    ) {}

    async find(email: string): Promise<User | null>{
        const existingUser = await this.userModel.findOne({email}).exec();
        return existingUser
    }
    async add(registerUserDto: RegisterUserDto): Promise<User | null>{
        const newUser = new this.userModel({ registerUserDto });
        return newUser.save();
    }

    async findAll(): Promise<User[] | null>{
        const existingUser = await this.userModel.find().exec();
        return existingUser
    }
    findById(id: number): string{
        return `Get user by ${id}`
    }
    updateById(id: number): string{
        return `Update user by ${id}`
    }
    deleteById(id: number): string{
        return `Delete user by ${id}`
    }
}
