import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { answerPath } from './path';

export const AnswerVoteUpPath = answerPath+'/:answerId/vote/up';

export class AnswerVoteUpParams {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1'
  })
  @IsNotEmpty({ message: 'Answer id is required' })
  @IsNumberString({}, { message: 'Answer id must be a number' })
  answerId: string;
}