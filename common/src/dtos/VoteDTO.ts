import { VoteTypeEnum } from "@enums/VoteType";
import { IsEnum } from "class-validator";

export class VoteDTO {
  @IsEnum(VoteTypeEnum, { message: `Vote must be a valid enum value: ${Object.values(VoteTypeEnum)}` })
    vote: VoteTypeEnum;
}