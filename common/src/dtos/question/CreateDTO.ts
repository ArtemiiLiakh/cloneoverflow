import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

export class QuestionCreateDTO {
  @IsNotEmpty({ message: 'Title is required' })
    title: string;

  @IsNotEmpty({ message: 'Text is required' })
    text: string;

  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
    tags?: string[];
}