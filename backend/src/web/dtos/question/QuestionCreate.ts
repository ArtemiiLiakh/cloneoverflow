import { QuestionCreateBody, QuestionCreateResponse } from '@cloneoverflow/common/api/question';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class ApiQuestionCreateBody implements QuestionCreateBody {
  @ApiProperty({
    description: 'Question title',
    type: 'string',
    example: 'Question title',
  })  
  @IsNotEmpty({ message: 'Question title is required' })
    title: string;
  
  @ApiProperty({
    description: 'Question body text',
    type: 'string',
    example: 'Question text',
  })  
  @IsNotEmpty({ message: 'Question text is required' })
    text: string;

  @ApiPropertyOptional({
    description: 'Question related tags',
    type: 'string',
    isArray: true,
    example: ['tag'],
  })
  @IsOptional()
  @IsArray({ message: 'Question tags must be an array' })
    tags?: string[];
}
 
export class ApiQuestionCreateResponse implements QuestionCreateResponse {
  @ApiProperty({
    description: 'Id of a created question',
    type: 'string',
    example: '1',
  })
    id: string;
}