import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req
} from '@nestjs/common';

import { Public } from '../auth/public.metadata';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UserMetadata } from '../common/dto/request.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Get()
  getAll(@Query() pagination: PaginationDto) {
    return this.postService.getAll(pagination);
  }

  @Public()
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.postService.getOne(id);
  }

  @Post()
  create(@Body() body: CreatePostDto, @Req() req: { user: UserMetadata }) {
    return this.postService.create(body, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.postService.update(id, body);
  }

  @Patch(':id/comment')
  addComment(
    @Param('id') id: string,
    @Body() body: AddCommentDto,
    @Req() req: { user: UserMetadata }
  ) {
    return this.postService.addComment(id, body, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

  @Delete(':postId/comment/:commentId')
  removeComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Req() req: { user: UserMetadata }
  ) {
    return this.postService.removeComment(postId, commentId, req.user);
  }
}
