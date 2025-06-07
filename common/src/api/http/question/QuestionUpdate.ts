import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { questionPath } from './paths';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export const QuestionUpdatePath = questionPath+'/:questionId';

export class QuestionUpdateParams {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '1'
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
  questionId: string
}

export class QuestionUpdateBody {
  @ApiPropertyOptional({
    description: 'Question title',
    type: 'string',
    example: 'Question title'
  })  
  title?: string;
  
  @ApiPropertyOptional({
    description: 'Question body text',
    type: 'string',
    example: 'Question text'
  })  
  text?: string;

  @ApiPropertyOptional({
    description: 'Question related tags',
    type: 'string',
    isArray: true,
    example: ['tag']
  })
  tags?: string[];
}