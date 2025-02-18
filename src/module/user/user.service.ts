
import { Model, RootFilterQuery, Types } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserCreateDto } from './dto/user.create.dto';
import { Message } from './enum/message.enum';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  save(body: UserCreateDto) {
    return new this.userModel(body).save();
  }

  find(filter?: RootFilterQuery<User>) {
    return filter ? this.userModel.find(filter) : this.userModel.find();
  }

  findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException({ message: Message.NoUser });
    }

    return this.userModel.findById(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
