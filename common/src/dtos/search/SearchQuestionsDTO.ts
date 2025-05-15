import { PaginationDTO } from '@dtos/PaginationDTO';
import { SearchQuestionFilterByEnum } from '@enums/filters';
import { OrderByEnum } from '@enums/OrderBy';
import { SearchQuestionSortByEnum } from '@enums/sorts';
import { Type } from "class-transformer";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";

export class SearchQuestionsDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsEnum(SearchQuestionFilterByEnum, { 
    message: `FilterBy must be a valid enum value: ${Object.values(SearchQuestionFilterByEnum)}`, 
    each: true,
  })
    filterBy?: SearchQuestionFilterByEnum[];
  
  @IsOptional()
  @IsEnum(SearchQuestionSortByEnum, { 
    message: `SortBy must be a valid enum value: ${Object.values(SearchQuestionSortByEnum)}`, 
    each: true,
  })
    sortBy?: SearchQuestionSortByEnum[];
  
  @IsOptional()
  @IsEnum(OrderByEnum, { 
    message: `OrderBy must be a valid enum value: ${Object.values(OrderByEnum)}` 
  })
    orderBy?: OrderByEnum;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}