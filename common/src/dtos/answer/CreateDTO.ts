import { IsNotEmpty } from 'class-validator';

export class AnswerCreateDTO {
  @IsNotEmpty({ message: 'Question id cannot be empty' })
    questionId: string;
  
  @IsNotEmpty({ message: 'Text cannot be empty' })
    text: string;
}