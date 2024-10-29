import { IsEnum } from "class-validator";
import { validationMessage } from "../utils/validationUtils";
import { VoteTypeEnum } from "../enums/VoteType";

export class VoteDTO {
  @IsEnum(VoteTypeEnum, validationMessage('Vote must be enum: up, down'))
    vote: VoteTypeEnum;
}