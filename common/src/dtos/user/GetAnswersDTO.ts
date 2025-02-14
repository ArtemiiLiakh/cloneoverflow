import { PaginationDTO } from '@dtos/PaginationDTO';
import { OrderByEnum } from "@enums/OrderBy";
import { AnswersSortByEnum } from "@enums/sorts/AnswersSortBy";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";

export class UserGetAnswersDTO {
  @IsOptional()
  @IsEnum(AnswersSortByEnum, { message: `SortBy must be a valid enum value: ${Object.values(AnswersSortByEnum)}` })
    sortBy?: AnswersSortByEnum

  @IsOptional()
  @IsEnum(OrderByEnum, { message: `OrderBy must be a valid enum value: ${Object.values(OrderByEnum)}` })
    orderBy?: OrderByEnum;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;

  @IsOptional()
    searchText?: string;
}