import { ApiProperty } from '@nestjs/swagger';
import { questionPath } from './paths';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export const QuestionMarkFavoritePath = questionPath+'/:questionId/favorite';

export class QuestionMarkFavoriteParams {
  @ApiProperty({
    description: 'Question id',
    type: 'string',
    example: '1'
  })
  @IsNotEmpty({ message: 'Question id is required' })
  @IsNumberString({}, { message: 'Question id must be a number' })
  questionId: string
}