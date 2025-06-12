import { QuestionUpdateBody, QuestionUpdateParams } from '@cloneoverflow/common/api/question';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ApiQuestionUpdateParams implements QuestionUpdateParams {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '1',
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
    questionId: string;
}

export class ApiQuestionUpdateBody implements QuestionUpdateBody {
  @ApiPropertyOptional({
    description: 'Question title',
    type: 'string',
    example: 'Question title',
  })  
    title?: string;
  
  @ApiPropertyOptional({
    description: 'Question body text',
    type: 'string',
    example: 'Question text',
  })  
    text?: string;

  @ApiPropertyOptional({
    description: 'Question related tags',
    type: 'string',
    isArray: true,
    example: ['tag'],
  })
    tags?: string[];
}