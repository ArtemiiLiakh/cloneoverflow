import { validationMessage } from '@utils/validationUtils';
import { IsNotEmpty } from "class-validator";

export class QuestionCloseDTO {
  @IsNotEmpty(validationMessage('Answer id is required'))
    answerId: string;
}