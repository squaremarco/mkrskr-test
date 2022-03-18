import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Post, PostSchema } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
