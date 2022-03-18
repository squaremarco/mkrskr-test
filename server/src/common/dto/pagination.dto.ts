import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @Type(() => Number)
  perPage: number;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
