import { validationMessageEnum } from '@/utils/validationMessage';
import { PaginationInfo, PaginationOptions } from '@data/Pagination';
import { SearchQuestionFilterByEnum } from '@enums/filters';
import { OrderByEnum } from '@enums/OrderBy';
import { SearchQuestionSortByEnum } from '@enums/sorts';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export const SearchQuestionsPath = '/questions/search';

export class SearchQuestionsQuery extends PaginationOptions {
  @ApiPropertyOptional({
    description: 'Search text. Search is processed between question title, body text, author name and tags',
    type: 'string',
  })
  @IsOptional()
  search?: string;
  
  @ApiPropertyOptional({
    description: 'Question filter options',
    type: 'string',
    enum: SearchQuestionFilterByEnum,
    example: SearchQuestionFilterByEnum.WEEKLY,
    default: SearchQuestionFilterByEnum.WEEKLY,
  })
  @IsOptional()
  @IsEnum(SearchQuestionFilterByEnum, validationMessageEnum(SearchQuestionFilterByEnum, 'Question filter'))
  filterBy?: SearchQuestionFilterByEnum;
  
  @ApiPropertyOptional({
    description: 'Question sort options',
    type: 'string',
    enum: SearchQuestionSortByEnum,
    example: SearchQuestionSortByEnum.DATE,
    default: SearchQuestionSortByEnum.DATE,
  })
  @IsOptional()
  @IsEnum(SearchQuestionSortByEnum, validationMessageEnum(SearchQuestionSortByEnum, 'Question sorting'))
  sortBy?: SearchQuestionSortByEnum;
  
  @ApiPropertyOptional({
    description: 'Question sorting order options',
    type: 'string',
    enum: OrderByEnum,
    example: OrderByEnum.DESC,
    default: OrderByEnum.DESC,
  })
  @IsOptional()
  @IsEnum(OrderByEnum, validationMessageEnum(OrderByEnum, 'Question sorting order'))
  orderBy?: OrderByEnum;
}

export class SearchQuestionDataItem {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '45dd8c93-c2b5-4c77-ae92-a591a2172d36',
  })
  id: string;
  
  @ApiProperty({
    description: 'Question title',
    type: 'string',
    example: 'Question title',
  })
  title: string;
  
  @ApiProperty({
    description: 'Question rating',
    type: 'number',
    example: 0,
  })
  rating: number;
  
  @ApiProperty({
    description: 'Question views',
    type: 'number',
    example: 0,
  })
  views: number;
  
  @ApiProperty({
    description: 'Is question closed',
    type: 'boolean',
    example: false,
  })
  isClosed: boolean;
  
  @ApiProperty({
    description: 'Question tags',
    type: 'string',
    example: ['tag'],
  })
  tags: string[];
  
  @ApiProperty({
    description: 'Question creation date',
    type: 'string',
    example: new Date(0).toISOString(),
  })
  createdAt: string;
  
  @ApiProperty({
    description: 'Question owner information',
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Question id', example: 'bf209a04-8cd5-41d4-a2bf-05b33466d794' },
      name: { type: 'string', description: 'Question name', example: 'Adam' },
      username: { type: 'string', description: 'Question username', example: 'adamsUsername' },
      rating: { type: 'number', description: 'Question rating', example: 0 },
    },
    nullable: true,
  })
  owner: {
    id: string;
    name: string;
    username: string;
    rating: number;
  } | null;
  
  @ApiProperty({
    description: 'Question answers amount',
    type: 'number',
    example: 0,
  })
  answersAmount: number;
}

export class SearchQuestionsResponse {
  @ApiProperty({
    description: 'Question paginated list',
    type: [SearchQuestionDataItem],
  })
  questions: SearchQuestionDataItem[];
  
  @ApiProperty({
    description: 'Pagination options',
    type: PaginationInfo,
  })
  pagination: PaginationInfo;
}