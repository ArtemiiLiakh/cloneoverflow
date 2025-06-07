import { validationMessageEnum } from '@/utils/validationMessage';
import { PaginationInfo, PaginationOptions } from '@data/Pagination';
import { OrderByEnum } from '@enums/OrderBy';
import { AnswersSortByEnum } from '@enums/sorts';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { userPath } from './paths';

export const UserGetAnswersPath = userPath+'/:userId/answers';

export class UserGetAnswersParams {
  @ApiProperty({
    description: 'User id',
    type: 'string',
    format: 'uuid',
    example: '79907ffc-a63e-4295-a64c-9d5569690113'
  })
  @IsNotEmpty({ message: 'User id is required' })
  @IsUUID('all', { message: 'User id must be in uuid format' })
  userId: string;
}

export class UserGetAnswersQuery extends PaginationOptions { 
  @ApiPropertyOptional({
    description: 'How user\'s answers must be sorted',
    type: 'string',
    enum: AnswersSortByEnum,
    example: AnswersSortByEnum.DATE,
    default: AnswersSortByEnum.DATE,
  })
  @IsOptional()
  @IsEnum(AnswersSortByEnum, validationMessageEnum(AnswersSortByEnum, 'Answer sorting'))
  sortBy?: AnswersSortByEnum
  
  @ApiPropertyOptional({
    description: 'Order how user\'s answers will be sorted',
    type: 'string',
    enum: OrderByEnum,
    example: OrderByEnum.DESC,
    default: OrderByEnum.DESC,
  })
  @IsOptional()
  @IsEnum(AnswersSortByEnum, validationMessageEnum(AnswersSortByEnum, 'Answer sorting order'))
  orderBy?: OrderByEnum;
  
  @ApiPropertyOptional({
    description: 'Search answers text. Search processed between answer text and question title',
    type: 'string',
  })
  @IsOptional()
  search?: string;
}

export class UserGetAnswerDataItem {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1'
  })
  id: string;

  @ApiProperty({
    description: 'Answer text',
    type: 'string',
  })
  text: string;

  @ApiProperty({
    description: 'Answer rating',
    type: 'number',
    example: 0,
  })
  rating: number;

  @ApiProperty({
    description: 'Is answer a solution for related question',
    type: 'boolean',
    example: false,
  })
  isSolution: boolean;

  @ApiProperty({
    description: 'Answer creation date',
    type: 'string',
    example: new Date(0).toISOString(),
  })
  createdAt: string;

  @ApiProperty({
    description: 'Last answer update',
    type: 'string',
    example: new Date(0).toISOString(),
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Answer question',
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Question id', example: '1' },
      title: { type: 'string', description: 'Question title', example: 'Question title' },
      rating: { type: 'number', description: 'Question rating', example: 0 },
    },
  })
  question: {
    id: string;
    title: string;
    rating: number;
  };
}

export class UserGetAnswersResponse {
  @ApiProperty({
    description: 'List of paginated answers',
    type: [UserGetAnswerDataItem],
  })
  answers: UserGetAnswerDataItem[];

  @ApiProperty({
    description: 'Pagination information',
    type: PaginationInfo,
  })
  pagination: PaginationInfo;
}