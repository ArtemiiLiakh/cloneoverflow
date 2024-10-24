import { Type } from "class-transformer";
import { IsOptional, IsEnum, ValidateNested } from "class-validator";
import { OrderBy } from "../types";
import { validationMessage } from "../utils/validationUtils";
import { AnswersSortByEnum } from "./answers.getAll.dto";
import { PaginationDTO } from "./pagination.dto";

export class UserGetAnswersDTO {
  @IsOptional()
  @IsEnum(AnswersSortByEnum, validationMessage('SortBy must be a valid enum value: rate, date, solution'))
    sortBy?: AnswersSortByEnum

  @IsOptional()
  @IsEnum(OrderBy, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderBy;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;

  @IsOptional()
    searchText?: string;
}