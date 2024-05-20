import { IsNotEmpty } from "class-validator";
import { validationMessage } from "../utils/validationUtils";

export class QuestionCloseDTO {
  @IsNotEmpty(validationMessage('Answer id is required'))
    answerId: string;
}