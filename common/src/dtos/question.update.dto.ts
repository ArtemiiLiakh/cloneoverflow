import { IsArray, IsEnum, IsOptional } from "class-validator";
import { validationMessage } from "../utils/validationUtils";
import { QuestionStatus } from '../types/QuestionStatus';

export class QuestionUpdateDTO {
  @IsOptional()
  title?: string;

  @IsOptional()
  text?: string;

  @IsOptional()
  @IsArray(validationMessage('Tags must be an array'))
  tags?: string[];
}