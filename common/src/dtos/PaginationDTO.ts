import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Page must be a number' })
    page?: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'PageSize must be a number' })
    pageSize?: number;
}