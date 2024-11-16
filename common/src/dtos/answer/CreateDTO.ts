import { validationMessage } from '@utils/validationUtils';
import { IsNotEmpty } from 'class-validator';

export class AnswerCreateDTO {
  @IsNotEmpty(validationMessage('Question id cannot be empty'))
    questionId: string;
  
  @IsNotEmpty(validationMessage('Text cannot be empty'))
    text: string;
}