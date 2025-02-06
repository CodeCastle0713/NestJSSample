import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schema/user.schema';
import { RegisterUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async find(email: string) {
    const existingUser = await this.userModel.findOne({ email }).exec();
    return existingUser;
  }

  async add(registerUserDto: RegisterUserDto) {
    return await new this.userModel(registerUserDto).save();
  }

  async findAll(): Promise<User[] | null> {
    const allUser = await this.userModel.find().exec();
    return allUser;
  }

  async findById(id: string) {
    const specificUser = await this.userModel.findById(id).exec();
    return specificUser;
  }

  async updateById(id: string, body: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException({ message: `User with ID ${id} not found` });
    }

    return updatedUser;
  }
  async deleteById(id: number) {
    const deletedUser = await this.userModel.findByIdAndDelete({ _id: id });

    if (!deletedUser) {
      throw new NotFoundException({ message: `User with ID ${id} not found` });
    }

    return deletedUser;
  }
}
