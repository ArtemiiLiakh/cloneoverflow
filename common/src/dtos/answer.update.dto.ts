import { IsNotEmpty } from "class-validator";
import { validationMessage } from "../utils/validationUtils";

export class AnswerUpdateDTO {
  @IsNotEmpty(validationMessage('Text cannot be empty'))
  text: string;
}