import { PaginationOptions } from '@cloneoverflow/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class ApiPaginationOptions implements PaginationOptions {
  @ApiProperty({
    description: 'Pagination page',
    type: 'number',
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Minimum value of page must be 1' })
    page?: number;
  
  @ApiProperty({
    description: 'Pagination page size',
    type: 'number',
    minimum: 1,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'PageSize must be a number' })
  @Min(1, { message: 'Minimum value of pageSize must be 1' })
    pageSize?: number;
}