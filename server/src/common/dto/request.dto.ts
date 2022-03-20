import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserMetadata {
  @IsString()
  readonly username: string;

  @IsString()
  readonly sub: string;
}

export class RequestDto {
  @Type(() => UserMetadata)
  readonly user: UserMetadata;
}
