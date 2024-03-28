import { IsArray, IsNotEmpty } from "class-validator";
import { validationMessage } from "../utils/validationUtils";

export class QuestionCreateDTO {
  @IsNotEmpty(validationMessage('Title is required'))
  title: string;

  @IsNotEmpty(validationMessage('Text is required'))
  text: string;

  @IsNotEmpty(validationMessage('Tags are required'))
  @IsArray(validationMessage('Tags must be an array'))
  tags: string[];
}