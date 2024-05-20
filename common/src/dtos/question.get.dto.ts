import { IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderBy } from "../types";

export enum QuestionAnswersSortBy {
  RATE = "rate",
  DATE = "date",
}

class AnswerDTO {
  @IsOptional()
  @IsEnum(QuestionAnswersSortBy, {
    message: `SortBy must be a valid enum value: ${Object.values(QuestionAnswersSortBy).join(', ')}`,
  })
    sortBy?: QuestionAnswersSortBy;
  
  @IsOptional()
  @IsEnum(OrderBy, {
    message: `OrderBy must be a valid enum value: ${Object.values(OrderBy).join(', ')}`,
  })
    orderBy?: OrderBy;
}

export class QuestionGetDTO {
  @ValidateNested()
  answers?: AnswerDTO;
}