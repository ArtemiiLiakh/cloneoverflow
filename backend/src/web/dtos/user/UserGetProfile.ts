import { UserStatusEnum } from '@cloneoverflow/common';
import { UserGetProfileParams, UserGetProfileResponse } from '@cloneoverflow/common/api/user';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ApiUserGetProfileParams implements UserGetProfileParams {
  @ApiProperty({
    description: 'User id',
    type: 'string',
    format: 'uuid',
    example: '79907ffc-a63e-4295-a64c-9d5569690113',
  })
  @IsNotEmpty({ message: 'User id is required' })
  @IsUUID('all', { message: 'User id must be in uuid format' })
    userId: string;
}

class BestUserAnswer {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1',
  })
    id: string;
  
  @ApiProperty({
    description: 'Answer rating',
    type: 'number',
    example: 0,
  })
    rating: number;
  
  @ApiProperty({
    description: 'Is the answer is a solution for the question',
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
    description: 'Answer question date',
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

class BestUserQuestion {
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
    example: 0,
  })
    rating: number;
  
  @ApiProperty({
    description: 'Is question is closed',
    type: 'boolean',
    example: false,
  })
    isClosed: boolean;
  
  @ApiProperty({
    description: 'Tags related to the question',
    type: 'string',
    isArray: true,
    example: ['tag'],
  })
    tags: string[];
  
  @ApiProperty({
    description: 'Amount of answers related to that question',
    type: 'number',
    example: 0,
  })
    answersAmount: number;
  
  @ApiProperty({
    description: 'Question creation date',
    type: 'string',
    format: 'date',
    example: new Date(0).toISOString(),
  })
    createdAt: string;
}

export class ApiUserGetProfileResponse implements UserGetProfileResponse {
  @ApiProperty({
    description: 'User id',
    type: 'string',
    format: 'uuid',
    example: '6876206a-6b5f-42d3-88f9-b41735adeddc',
  })
    id: string;
  
  @ApiProperty({
    description: 'User name',
    type: 'string',
    example: 'Adam',
  })
    name: string;
  
  @ApiProperty({
    description: 'User unique username',
    type: 'string',
    example: 'adamsUsername',
  })
    username: string;
  
  @ApiProperty({
    description: 'User rating',
    type: 'number',
    example: 0,
  })
    rating: number;
  
  @ApiProperty({
    description: 'User about information',
    type: 'string',
  })
    about: string;

  @ApiProperty({
    description: 'User status',
    type: 'string',
    enum: UserStatusEnum,
    example: UserStatusEnum.USER,
  })
    status: UserStatusEnum;
  
  @ApiProperty({
    description: 'User creation date',
    type: 'string',
    example: new Date(0).toISOString(),
  })
    createdAt: string;

  @ApiProperty({
    description: 'Last date user was updated',
    type: 'string',
    example: new Date(0).toISOString(),
  })
    updatedAt: string;
  
  @ApiProperty({
    description: 'Total amount of user\'s answers',
    type: 'number',
    example: 0,
  })
    answerAmount: number;
  
  @ApiProperty({
    description: 'Total amount of user\'s questions',
    type: 'number',
    example: 0,
  })
    questionAmount: number;
  
  @ApiProperty({
    description: 'Best user answer',
    type: BestUserAnswer,
    nullable: true,
  })
    bestAnswer: BestUserAnswer | null;
  
  @ApiProperty({
    description: 'Best user question',
    type: BestUserQuestion,
    nullable: true,
  })
    bestQuestion: BestUserQuestion | null;
}