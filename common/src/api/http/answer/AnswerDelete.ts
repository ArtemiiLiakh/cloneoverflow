import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { answerPath } from './path';

export const AnswerDeletePath = answerPath+'/:answerId';

export class AnswerDeleteParams {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1'
  })
  @IsNotEmpty({ message: 'Answer id is required' })
  @IsNumberString({}, { message: 'Answer id must be a number' })
  answerId: string;
}
