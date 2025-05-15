import { IsArray, IsOptional } from "class-validator";

export class QuestionUpdateDTO {
  @IsOptional()
  title?: string;

  @IsOptional()
  text?: string;

  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
  tags?: string[];
}