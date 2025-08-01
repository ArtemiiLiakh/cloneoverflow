import { AnswerVoteDownParams } from '@cloneoverflow/common/api/answer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ApiAnswerVoteDownParams implements AnswerVoteDownParams {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Answer id is required' })
  @IsNumberString({}, { message: 'Answer id must be a number' })
    answerId: string;
}