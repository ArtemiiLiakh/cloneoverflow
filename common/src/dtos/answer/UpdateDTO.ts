import { IsNotEmpty } from "class-validator";

export class AnswerUpdateDTO {
  @IsNotEmpty({ message: 'Text cannot be empty' })
    text: string;
}