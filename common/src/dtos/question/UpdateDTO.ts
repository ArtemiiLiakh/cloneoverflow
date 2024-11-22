import { validationMessage } from '@utils/validationUtils';
import { IsArray, IsOptional } from "class-validator";

export class QuestionUpdateDTO {
  @IsOptional()
  title?: string;

  @IsOptional()
  text?: string;

  @IsOptional()
  @IsArray(validationMessage('Tags must be an array'))
  tags?: string[];
}