import { validationMessage } from '@utils/validationUtils';
import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class QuestionCreateDTO {
  @IsNotEmpty(validationMessage('Title is required'))
    title: string;

  @IsNotEmpty(validationMessage('Text is required'))
    text: string;

  @IsOptional()
  @IsArray(validationMessage('Tags must be an array'))
    tags?: string[];
}