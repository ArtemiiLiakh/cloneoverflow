import { IsNotEmpty } from "class-validator";
import { validationMessage } from "../utils/functionUtils";

export class QuestionCreateDTO {
  @IsNotEmpty(validationMessage('Title is required'))
  title: string;

  @IsNotEmpty(validationMessage('Text is required'))
  text: string;

  @IsNotEmpty(validationMessage('Tags are required'))
  tags: string[];
}