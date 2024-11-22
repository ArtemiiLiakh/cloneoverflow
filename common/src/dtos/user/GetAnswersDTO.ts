import { PaginationDTO } from '@data/PaginationDTO';
import { OrderByEnum } from "@enums/OrderBy";
import { AnswersSortByEnum } from "@enums/sorts/AnswersSortBy";
import { validationMessage } from "@utils/validationUtils";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";

export class UserGetAnswersDTO {
  @IsOptional()
  @IsEnum(AnswersSortByEnum, validationMessage(`SortBy must be a valid enum value: ${Object.values(AnswersSortByEnum)}`))
    sortBy?: AnswersSortByEnum

  @IsOptional()
  @IsEnum(OrderByEnum, validationMessage(`OrderBy must be a valid enum value: ${Object.values(OrderByEnum)}`))
    orderBy?: OrderByEnum;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;

  @IsOptional()
    searchText?: string;
}