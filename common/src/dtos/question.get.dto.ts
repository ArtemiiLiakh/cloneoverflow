import { IsEnum, IsOptional } from "class-validator";
import { QuestionIncludeEnum } from "../enums/includes/QuestionInclude";
import { validationMessage } from "../utils/validationUtils";

export class QuestionGetDTO {
  @IsOptional()
  @IsEnum(QuestionIncludeEnum, validationMessage('Question include must be a valid enum value', true))
    include?: QuestionIncludeEnum[];
}