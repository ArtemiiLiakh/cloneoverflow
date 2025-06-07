import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { questionPath } from './paths';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export const QuestionCreatePath = questionPath;

export class QuestionCreateBody {
  @ApiProperty({
    description: 'Question title',
    type: 'string',
    example: 'Question title'
  })  
  @IsNotEmpty({ message: 'Question title' })
  title: string;
  
  @ApiProperty({
    description: 'Question body text',
    type: 'string',
    example: 'Question text'
  })  
  @IsNotEmpty({ message: 'Question text' })
  text: string;

  @ApiPropertyOptional({
    description: 'Question related tags',
    type: 'string',
    isArray: true,
    example: ['tag']
  })
  @IsOptional()
  @IsArray({ message: 'Question tags must be an array' })
  tags?: string[];
}
 
export class QuestionCreateResponse {
  @ApiProperty({
    description: 'Id of a created question',
    type: 'string',
    example: '1',
  })
  id: string;
}