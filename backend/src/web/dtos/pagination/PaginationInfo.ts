import { PaginationInfo } from '@cloneoverflow/common';
import { ApiProperty } from '@nestjs/swagger';

export class ApiPaginationInfo implements PaginationInfo {
  @ApiProperty({
    description: 'Current page',
    type: 'number',
    example: 1,
  })
    page: number;

  @ApiProperty({
    description: 'Current page size',
    type: 'number',
    example: 1,
  })
    pageSize: number;
  
  @ApiProperty({
    description: 'Total amount of pages',
    type: 'number',
    example: 1,
  })
    totalPages: number;
  
  @ApiProperty({
    description: 'Total amount of entities ',
    type: 'number',
    example: 1,
  })
    totalAmount: number;
  
  @ApiProperty({
    description: 'Has values on the next page',
    type: 'boolean',
    example: false,
  })
    hasNext: boolean;
}