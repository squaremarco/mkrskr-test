import { IsString } from 'class-validator';

export class AddCommentDto {
  @IsString()
  readonly content: string;
}
