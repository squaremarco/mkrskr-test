import {
  ConflictException,
  Injectable,
  NotFoundException,
  Req
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserMetadata } from '../common/dto/request.dto';
import { throwsException } from '../utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async getMe(@Req() req: { user: UserMetadata }) {
    return req.user;
  }

  async getOne(username: string) {
    return (
      (await this.userModel.findOne({ username }).exec()) ??
      throwsException(NotFoundException, `User ${username} not found.`)
    );
  }

  async create(body: CreateUserDto) {
    if (await this.userModel.findOne({ username: body.username }).exec()) {
      throwsException(
        ConflictException,
        `User ${body.username} already exists.`
      );
    }

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
