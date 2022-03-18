import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';

import { PaginationDto } from '../common/dto/pagination.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll(@Query() pagination: PaginationDto) {
    return this.postService.getAll(pagination);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.postService.getOne(id);
  }

  @Post()
  create(@Body() body: CreatePostDto) {
    return this.postService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.postService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
