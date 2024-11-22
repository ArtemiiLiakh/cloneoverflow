import { PaginationDTO } from '@data/PaginationDTO';
import { SearchQuestionFilterByEnum } from '@enums/filters';
import { OrderByEnum } from '@enums/OrderBy';
import { SearchQuestionSortByEnum } from '@enums/sorts';
import { validationMessage } from '@utils/validationUtils';
import { Type } from "class-transformer";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";

export class SearchQuestionsDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsEnum(SearchQuestionFilterByEnum, validationMessage(`FilterBy must be a valid enum value: ${Object.values(SearchQuestionFilterByEnum)}`, true))
    filterBy?: SearchQuestionFilterByEnum[];
  
  @IsOptional()
  @IsEnum(SearchQuestionSortByEnum, validationMessage(`SortBy must be a valid enum value: ${Object.values(SearchQuestionSortByEnum)}`, true))
    sortBy?: SearchQuestionSortByEnum[];
  
  @IsOptional()
  @IsEnum(OrderByEnum, validationMessage(`OrderBy must be a valid enum value: ${Object.values(OrderByEnum)}`))
    orderBy?: OrderByEnum;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}