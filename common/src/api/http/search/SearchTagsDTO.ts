import { validationMessageEnum } from '@/utils/validationMessage';
import { PaginationInfo, PaginationOptions } from '@data/Pagination';
import { OrderByEnum } from '@enums/OrderBy';
import { SearchTagsSortByEnum } from '@enums/sorts';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export const SearchTagsPath = '/tags/search';

export class SearchTagsQuery extends PaginationOptions {
  @ApiPropertyOptional({
    description: 'Search by tag name',
    type: 'string',
    example: 'tag'
  })
  @IsOptional()
  name?: string;
  
  @ApiPropertyOptional({
    description: 'Tag sorting options',
    type: 'string',
    example: SearchTagsSortByEnum.POPULAR,
    default: SearchTagsSortByEnum.POPULAR,
  })
  @IsOptional()
  @IsEnum(SearchTagsSortByEnum, validationMessageEnum(SearchTagsSortByEnum, 'Tags sorting'))
  sortBy?: SearchTagsSortByEnum;

  @ApiPropertyOptional({
    description: 'Tag sorting order',
    type: 'string',
    example: OrderByEnum.DESC,
    default: OrderByEnum.DESC,
  })
  @IsOptional()
  @IsEnum(OrderByEnum, validationMessageEnum(OrderByEnum, 'Tags sorting order'))
  orderBy?: OrderByEnum;
}

export class SearchTagsDataItem {
  @ApiProperty({
    description: 'Tag id',
    type: 'string',
    example: 'd5c8c91f-b12e-42d7-8767-f21dd3425930',
  })
  id: string;
  
  @ApiProperty({
    description: 'Tag name',
    type: 'string',
    example: 'tag',
  })
  name: string;
  
  @ApiProperty({
    description: 'Amount of questions the tag is related to',
    example: 0,
  })
  questionsAmount: number;
}

export class SearchTagsResponse {
  @ApiProperty({
    description: 'Tags paginated list',
    type: [SearchTagsDataItem]
  })
  tags: SearchTagsDataItem[];

  @ApiProperty({
    description: 'Pagination information',
    type: PaginationInfo
  })
  pagination: PaginationInfo;
}