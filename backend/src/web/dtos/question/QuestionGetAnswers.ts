import { AnswersSortByEnum, OrderByEnum, PaginationInfo, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionGetAnswersDataItem, QuestionGetAnswersParams, QuestionGetAnswersQuery, QuestionGetAnswersResponse } from '@cloneoverflow/common/api/question';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { ApiPaginationInfo } from '../pagination/PaginationInfo';
import { ApiPaginationOptions } from '../pagination/PaginationOptions';
import { validationMessageEnum } from '../utils';

export class ApiQuestionGetAnswersParams implements QuestionGetAnswersParams {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
    questionId: string;
}

export class ApiQuestionGetAnswersQuery extends ApiPaginationOptions implements QuestionGetAnswersQuery {
  @ApiPropertyOptional({
    description: 'Sorting answers',
    type: 'string',
    enum: AnswersSortByEnum,
    example: AnswersSortByEnum.DATE,
    default: AnswersSortByEnum.DATE,
  })
  @IsOptional()
  @IsEnum(AnswersSortByEnum, validationMessageEnum(AnswersSortByEnum, 'Question sorting'))
    sortBy?: AnswersSortByEnum;
  
  @ApiPropertyOptional({
    description: 'Order of sorting answer',
    type: 'string',
    enum: OrderByEnum,
    example: OrderByEnum.DESC,
    default: OrderByEnum.DESC,
  })
  @IsOptional()
  @IsEnum(OrderByEnum, validationMessageEnum(OrderByEnum, 'Question sorting order'))
    orderBy?: OrderByEnum;
}

export class ApiQuestionGetAnswersDataItem implements QuestionGetAnswersDataItem {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1',
  })
    id: string;

  @ApiProperty({
    description: 'Question id to which the answer is related',
    type: 'string',
    example: '1',
  })
    questionId: string;

  @ApiProperty({
    description: 'Answer text',
    type: 'string',
    example: 'answer text to that question',
  })
    text: string;
  
  @ApiProperty({
    description: 'Answer rating',
    type: 'number',
    example: 0,
  })
    rating: number;
  
  @ApiProperty({
    description: 'Is the answer a solution for the question',
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
    description: 'Last date of answer update',
    type: 'string',
    example: new Date(0).toISOString(),
  })
    updatedAt: string;
  
  @ApiProperty({
    description: 'Answer owner',
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Owner\'s id', format: 'uuid', example: '6b0407bc-9788-4a7f-ab52-3789432e97d8' },
      name: { type: 'string', description: 'Owner\'s name', example: 'Adam' },
      username: { type: 'string', description: 'Owner\'s unique username', example: 'adamsUsername' },
      rating: { type: 'number', description: 'Owner\'s rating', example: 0 },
    },
    nullable: true,
  })
    owner: {
      id: string,
      name: string,
      username: string,
      rating: number,
    } | null;

  @ApiProperty({
    description: 'If user is authorized, it shows his vote for that answer',
    type: 'string',
    enum: VoteTypeEnum,
    nullable: true,
  })
    myVoteType: VoteTypeEnum | null;
}

export class ApiQuestionGetAnswersResponse implements QuestionGetAnswersResponse {
  @ApiProperty({
    description: 'Answers result',
    type: [ApiQuestionGetAnswersDataItem],
  })
    answers: QuestionGetAnswersDataItem[];
  
  @ApiPropertyOptional({
    description: 'Pagination information',
    type: ApiPaginationInfo,
  })
    pagination: PaginationInfo;
}