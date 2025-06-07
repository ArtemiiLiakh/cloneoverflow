import { ApiProperty } from '@nestjs/swagger';
import { questionPath } from './paths';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export const QuestionDeletePath = questionPath+'/:questionId';

export class QuestionDeleteParams {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '1'
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
  questionId: string
}