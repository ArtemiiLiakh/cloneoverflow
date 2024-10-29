import { Type } from "class-transformer";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";
import { SearchQuestionFilterByEnum } from "../enums/filters/SearchQuestionsFilterBy";
import { OrderByEnum } from "../enums/OrderBy";
import { SearchQuestionSortByEnum } from "../enums/sorts/SearchQuestionsSortBy";
import { validationMessage } from "../utils/validationUtils";
import { PaginationDTO } from "./pagination.dto";

export class SearchQuestionsDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsEnum(SearchQuestionFilterByEnum, validationMessage('FilterBy must be a valid enum value: answered, weekly, monthly', true))
    filterBy?: SearchQuestionFilterByEnum[];
  
  @IsOptional()
  @IsEnum(SearchQuestionSortByEnum, validationMessage('SortBy must be a valid enum value: rate, date, answers, status', true))
    sortBy?: SearchQuestionSortByEnum[];
  
  @IsOptional()
  @IsEnum(OrderByEnum, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderByEnum;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}