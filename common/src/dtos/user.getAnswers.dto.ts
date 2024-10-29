import { Type } from "class-transformer";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderByEnum } from "../enums/OrderBy";
import { AnswersSortByEnum } from "../enums/sorts/AnswersSortBy";
import { validationMessage } from "../utils/validationUtils";
import { PaginationDTO } from "./pagination.dto";

export class UserGetAnswersDTO {
  @IsOptional()
  @IsEnum(AnswersSortByEnum, validationMessage('SortBy must be a valid enum value'))
    sortBy?: AnswersSortByEnum

  @IsOptional()
  @IsEnum(OrderByEnum, validationMessage('OrderBy must be a valid enum value'))
    orderBy?: OrderByEnum;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;

  @IsOptional()
    searchText?: string;
}