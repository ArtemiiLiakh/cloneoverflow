import { validationMessage } from '@utils/validationUtils';
import { IsNotEmpty } from "class-validator";

export class AnswerUpdateDTO {
  @IsNotEmpty(validationMessage('Text cannot be empty'))
    text: string;
}