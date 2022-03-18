import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PaginationDto } from '../common/dto/pagination.dto';
import { throwsException } from '../utils';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>
  ) {}

  getAll({ perPage, page = 1 }: PaginationDto) {
    return this.postModel
      .find()
      .limit(perPage)
      .skip((page - 1) * perPage)
      .exec();
  }

  async getOne(id: string) {
    return (
      (await this.postModel.findById(id).exec()) ??
      throwsException(NotFoundException, `Post ${id} not found.`)
    );
  }

  create(body: CreatePostDto) {
    return this.postModel.create(body);
  }

  async update(id: string, body: UpdatePostDto) {
    return (
      (await this.postModel
        .findByIdAndUpdate(id, { $set: body }, { new: true })
        .exec()) ?? throwsException(NotFoundException, `Post ${id} not found.`)
    );
  }

  remove(id: string) {
    return this.postModel.findByIdAndRemove(id);
  }
}
