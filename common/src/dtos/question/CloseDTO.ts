import { IsNotEmpty } from "class-validator";

export class QuestionCloseDTO {
  @IsNotEmpty({ message: 'Answer id is required' })
    answerId: string;
}