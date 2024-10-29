import { Type } from "class-transformer";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderByEnum } from "../enums/OrderBy";
import { SearchTagsSortByEnum } from "../enums/sorts/SearchTagsSortBy";
import { validationMessage } from "../utils/validationUtils";
import { PaginationDTO } from "./pagination.dto";

export class SearchTagsDTO {
  @IsOptional()
    name?: string;
    
  @IsOptional()
  @IsEnum(SearchTagsSortByEnum, validationMessage('SortBy must be a valid enum value: popular, name, newest'))
    sortBy?: SearchTagsSortByEnum;
    
  @IsOptional()
  @IsEnum(OrderByEnum, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderByEnum;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}