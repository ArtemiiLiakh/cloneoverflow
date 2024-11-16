import { VoteTypeEnum } from "@enums/VoteType";
import { validationMessage } from "@utils/validationUtils";
import { IsEnum } from "class-validator";

export class VoteDTO {
  @IsEnum(VoteTypeEnum, validationMessage(`Vote must be a valid enum value: ${Object.values(VoteTypeEnum)}`))
    vote: VoteTypeEnum;
}