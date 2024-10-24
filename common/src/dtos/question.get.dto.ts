import { IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderBy } from "../types";

export enum QuestionAnswersSortByEnum {
  RATE = "rate",
  DATE = "date",
}

class AnswerDTO {
  @IsOptional()
  @IsEnum(QuestionAnswersSortByEnum, {
    message: `SortBy must be a valid enum value: ${Object.values(QuestionAnswersSortByEnum).join(', ')}`,
  })
    sortBy?: QuestionAnswersSortByEnum;
  
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