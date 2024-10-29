import { IsEnum, IsOptional } from "class-validator";
import { AnswerIncludeEnum } from "../enums/includes/AnswerInclude";
import { validationMessage } from "../utils/validationUtils";

export class AnswerGetDTO {
  @IsOptional()
  @IsEnum(AnswerIncludeEnum, validationMessage('Answer inlude must be a valid enum value', true))
    include?: AnswerIncludeEnum[]
}