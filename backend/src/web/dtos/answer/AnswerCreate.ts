import { AnswerCreateBody, AnswerCreateResponse } from '@cloneoverflow/common/api/answer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ApiAnswerCreateBody implements AnswerCreateBody {
  @ApiProperty({
    description: 'Question id to which the answer is related',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Questwion id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
    questionId: string;
  
  @ApiProperty({
    description: 'Answer text related to the question',
    type: 'string',
  })
  @IsNotEmpty({ message: 'Answer text is required' })
    text: string;
}

export class ApiAnswerCreateResponse implements AnswerCreateResponse {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1',
  })
    id: string;
}