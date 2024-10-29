import { IsEnum, IsOptional } from "class-validator";
import { UserIncludeEnum } from "../enums";
import { validationMessage } from "../utils/validationUtils";

export class UserGetDTO {
  @IsOptional()
  @IsEnum(UserIncludeEnum, validationMessage('User include must be a valid enum value', true))
    include?: UserIncludeEnum[];
}