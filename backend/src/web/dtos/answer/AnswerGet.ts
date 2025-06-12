import { VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerGetParams, AnswerGetResponse } from '@cloneoverflow/common/api/answer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ApiAnswerGetParams implements AnswerGetParams {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Answer id is required' })
  @IsNumberString({}, { message: 'Answer id must be a number' })
    answerId: string;
}

export class ApiAnswerGetResponse implements AnswerGetResponse {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1',
  })
    id: string;
  
  @ApiProperty({
    description: 'Id of a question the answer is related to',
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
      id: string;
      name: string;
      username: string;
      rating: number;
    } | null;
  
  @ApiProperty({
    description: 'If user is authorized, it shows if he is voter for that answer',
    type: 'string',
    enum: VoteTypeEnum,
    nullable: true,
  })
    myVoteType: VoteTypeEnum | null;
  
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
}