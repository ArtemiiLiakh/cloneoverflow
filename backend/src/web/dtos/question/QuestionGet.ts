import { VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionGetParams, QuestionGetResponse } from '@cloneoverflow/common/api/question';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ApiQuestionGetParams implements QuestionGetParams {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
    questionId: string;
}

export class ApiQuestionGetResponse implements QuestionGetResponse {
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
    description: 'Question body text',
    type: 'string',
  })
    text: string;
  
  @ApiProperty({
    description: 'Question rating',
    type: 'number',
    example: 0,
  })
    rating: number;
  
  @ApiProperty({
    description: 'Question amount of viewers',
    type: 'number',
    example: 0,
  })
    views: number;
  
  @ApiProperty({
    description: 'Is question closed and has been answered',
    type: 'boolean',
    example: false,
  })
    isClosed: boolean;

  @ApiProperty({
    description: 'Is question favorite for the user',
    type: 'boolean',
    example: false,
  })
    isFavorite: boolean;
  
  @ApiProperty({
    description: 'Question creation date',
    type: 'string',
    format: 'date',
    example: new Date(0).toISOString(),
  })
    createdAt: Date;
  
  @ApiProperty({
    description: 'Last question update date',
    type: 'string',
    format: 'date',
    example: new Date(0).toISOString(),
  })
    updatedAt: Date;
  
  @ApiProperty({
    description: 'Question owner',
    type: 'object',
    properties: {
      id: { type: 'string', description: 'User\'s id', format: 'uuid', example: 'ba4b9228-45e1-4fe0-b9ab-149b085e3a60' },
      name: { type: 'string', description: 'User\'s name', example: 'Adam' },
      username: { type: 'string', description: 'User\'s username', example: 'adamsUsername' },
      rating: { type: 'number', description: 'User\'s rating', example: 0 },
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
    description: 'Tags related to the question',
    type: 'string',
    isArray: true,
  })
    tags: string[];
  
  @ApiProperty({
    description: 'If user is authorized, it shows his vote for the question',
    type: 'string',
    enum: VoteTypeEnum,
    nullable: true,
  })
    myVoteType: VoteTypeEnum | null; 
}