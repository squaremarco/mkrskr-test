import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop([String])
  comments: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
