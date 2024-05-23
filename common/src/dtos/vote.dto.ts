import { IsEnum } from "class-validator";
import { validationMessage } from "../utils/validationUtils";
import { VoteType } from "../types";

export class VoteDTO {
  @IsEnum(VoteType, validationMessage('Vote must be enum: up, down'))
    vote: VoteType;
}