import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { throwsException } from '../utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async getOne(username: string) {
    return (
      (await this.userModel.findOne({ username }).exec()) ??
      throwsException(NotFoundException, `User ${username} not found.`)
    );
  }

  create(body: CreateUserDto) {
    return this.userModel.create(body);
  }

  async update(username: string, body: UpdateUserDto) {
    return (
      (await this.userModel
        .findOneAndUpdate({ username }, { $set: body }, { new: true })
        .exec()) ??
      throwsException(NotFoundException, `User ${username} not found.`)
    );
  }
}
