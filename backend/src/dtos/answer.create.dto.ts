import { IsNotEmpty } from 'class-validator';
import { validationMessage } from '../utils/functionUtils';

export class AnswerCreateDTO {
  @IsNotEmpty(validationMessage('Question id cannot be empty'))
    questionId: string;
  
  @IsNotEmpty(validationMessage('Text cannot be empty'))
    text: string;
}