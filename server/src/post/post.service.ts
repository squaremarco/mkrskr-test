import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PaginationDto } from '../common/dto/pagination.dto';
import { UserMetadata } from '../common/dto/request.dto';
import { throwsException } from '../utils';
import { AddCommentDto } from './dto/add-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>
  ) {}

  async getAll({ perPage, page = 1 }: PaginationDto) {
    const totalPages = Math.ceil((await this.postModel.count()) / perPage);
    const data = await this.postModel
      .find()
      .limit(perPage)
      .populate({ path: 'user', select: 'username' })
      .populate({ path: 'comments.user', select: 'username' })
      .skip((page - 1) * perPage)
      .exec();

    return {
      data,
      totalPages
    };
  }

  async getOne(id: string) {
    return (
      (await this.postModel
        .findById(id)
        .populate({ path: 'user', select: 'username' })
        .populate({ path: 'comments.user', select: 'username' })
        .exec()) ?? throwsException(NotFoundException, `Post ${id} not found.`)
    );
  }

  create(body: CreatePostDto, user: UserMetadata) {
    return this.postModel.create({ ...body, user: user.sub });
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

  async addComment(id: string, body: AddCommentDto, user: UserMetadata) {
    return this.postModel.findByIdAndUpdate(
      id,
      { $push: { comments: { ...body, user: user.sub } } },
      { new: true }
    );
  }

  async removeComment(postId: string, commentId: string, user: UserMetadata) {
    return (
      (await this.postModel
        .findByIdAndUpdate(
          postId,
          { $pull: { comments: { _id: commentId, user: user.sub } } },
          { new: true }
        )
        .exec()) ??
      throwsException(ForbiddenException, `Can't delete another user comment!`)
    );
  }
}
