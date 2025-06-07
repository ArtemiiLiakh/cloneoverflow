import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationOptions {
  @ApiPropertyOptional({
    description: 'Page of the data list. The first page begins with 1',
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: 'Page must be a number' })
  @Min(1, { message: 'Minimum page value is 1' })
  @Type(() => Number)
  page?: number;
  
  @ApiPropertyOptional({
    description: 'The size of the current page',
    minimum: 1,
    example: 10,
  })
  @IsOptional()
  @IsInt({ message: 'Page size must be a number' })
  @Min(1, { message: 'Minimum page size value is 1' })
  @Type(() => Number)
  pageSize?: number;
}

export class PaginationInfo {
  @ApiProperty({
    description: 'Number of page',
    example: 0,
  })
  page: number;
  
  @ApiProperty({
    description: 'Page size',
    example: 0,
  })
  pageSize: number;
  
  @ApiProperty({
    description: 'Total amount of pages',
    example: 0,
  })
  totalPages: number;
  
  @ApiProperty({
    description: 'Total amount of requested data',
    example: 0,
  })
  totalAmount: number;
  
  @ApiProperty({
    description: 'Is there are elements on the next page',
    example: false,
  })
  hasNext: boolean;
}