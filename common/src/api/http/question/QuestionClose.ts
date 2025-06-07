import { ApiProperty } from '@nestjs/swagger';
import { questionPath } from './paths';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export const QuestionClosePath = questionPath+'/:questionId/close';

export class QuestionCloseParams {
  @ApiProperty({
    description: 'Id of a question to close',
    type: 'string',
    example: '1'
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
  questionId: string
}

export class QuestionCloseBody {
  @ApiProperty({
    description: 'Answer id that is a solution for the question',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Answer id is required' })
  @IsNumberString({}, { message: 'Answer id must be a number' })
  answerId: string;
}