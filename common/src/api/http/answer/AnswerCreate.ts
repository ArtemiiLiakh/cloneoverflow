import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { answerPath } from './path';

export class AnswerCreateBody {
  @ApiProperty({
    description: 'Question id to which the answer is related',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
  questionId: string;
  
  @ApiProperty({
    description: 'Answer text related to the question',
    type: 'string',
  })
  @IsNotEmpty({ message: 'Answer text is required' })
  text: string;
}

export class AnswerCreateResponse {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1'
  })
  id: string;
}

export const AnswerCreatePath = answerPath;