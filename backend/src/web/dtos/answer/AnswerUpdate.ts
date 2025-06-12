import { AnswerUpdateBody, AnswerUpdateParams } from '@cloneoverflow/common/api/answer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ApiAnswerUpdateParams implements AnswerUpdateParams {
  @ApiProperty({
    description: 'Answer id',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Answer id is required' })
  @IsNumberString({}, { message: 'Answer id must be a number' })
    answerId: string;
}

export class ApiAnswerUpdateBody implements AnswerUpdateBody {
  @ApiProperty({
    description: 'Answer text',
    type: 'string',
  })
  @IsNotEmpty({ message: 'New answer text is required' })
    text: string;
}