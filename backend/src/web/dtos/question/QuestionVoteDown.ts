import { QuestionVoteDownParams } from '@cloneoverflow/common/api/question';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ApiQuestionVoteDownParams implements QuestionVoteDownParams {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
    questionId: string;
}