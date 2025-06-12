import { OrderByEnum, PaginationInfo, QuestionsSortByEnum } from '@cloneoverflow/common';
import { UserGetQuestionDataItem, UserGetQuestionsParams, UserGetQuestionsQuery, UserGetQuestionsResponse } from '@cloneoverflow/common/api/user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiPaginationInfo } from '../pagination/PaginationInfo';
import { ApiPaginationOptions } from '../pagination/PaginationOptions';
import { validationMessageEnum } from '../utils';

export class ApiUserGetQuestionsParams implements UserGetQuestionsParams {
  @ApiProperty({
    description: 'User id',
    type: 'string',
    format: 'uuid',
    example: '79907ffc-a63e-4295-a64c-9d5569690113',
  })
  @IsNotEmpty({ message: 'User id is required' })
  @IsUUID('all', {  message: 'User id must be in uuid format' })
    userId: string;
}

export class ApiUserGetQuestionsQuery extends ApiPaginationOptions implements UserGetQuestionsQuery {
  @ApiPropertyOptional({
    description: 'Search answers text. Search processed between question title and question body text',
    type: 'string',
  })
  @IsOptional()
    search?: string;
  
  @ApiPropertyOptional({
    description: 'Search answers by list of tags',
    type: 'string',
    isArray: true,
    example: ['tag'],
  })
  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
    tags?: string[];

  @ApiPropertyOptional({
    description: 'How user\'s questions must be sorted',
    type: 'string',
    enum: QuestionsSortByEnum,
    example: QuestionsSortByEnum.DATE,
    default: QuestionsSortByEnum.DATE,
  })
  @IsOptional()
  @IsEnum(QuestionsSortByEnum, validationMessageEnum(QuestionsSortByEnum, 'Question sorting'))
    sortBy?: QuestionsSortByEnum;

  @ApiPropertyOptional({
    description: 'Order how user\'s questions will be sorted',
    type: 'string',
    enum: OrderByEnum,
    example: OrderByEnum.DESC,
    default: OrderByEnum.DESC,
  })
  @IsOptional()
  @IsEnum(OrderByEnum, validationMessageEnum(OrderByEnum, 'Question sorting order'))
    orderBy?: OrderByEnum;
}

export class ApiUserGetQuestionDataItem implements UserGetQuestionDataItem {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '1',
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
    example: 'Question rating',
  })
    rating: number;
  
  @ApiProperty({
    description: 'Question views',
    type: 'number',
    example: 0,
  })
    views: number;
  
  @ApiProperty({
    description: 'Question tags',
    type: 'string',
    isArray: true,
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
    description: 'Is question closed',
    type: 'boolean',
    example: false,
  })
    isClosed: boolean;
  
  @ApiProperty({
    description: 'Question answers amount',
    type: 'number',
    example: 0,
  })
    answersAmount: number;
}

export class ApiUserGetQuestionsResponse implements UserGetQuestionsResponse {
  @ApiProperty({
    description: 'Question data',
    type: [ApiUserGetQuestionDataItem],
  })
    questions: UserGetQuestionDataItem[];
  
  @ApiProperty({
    description: 'Question information',
    type: ApiPaginationInfo,
  })
    pagination: PaginationInfo;
}