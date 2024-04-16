import { IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderBy } from "../types";
import { validationMessage } from "../utils/validationUtils";
import { PaginationDTO } from "./pagination.dto";
import { Type } from "class-transformer";

export enum SearchTagsSortBy {
  POPULAR = "popular",
  NAME = "name",
  NEWEST = "newest",
}

export class SearchTagsDTO {
  @IsOptional()
    name?: string;
    
  @IsOptional()
  @IsEnum(SearchTagsSortBy, validationMessage('SortBy must be a valid enum value: popular, name, newest'))
    sortBy?: SearchTagsSortBy;
    
  @IsOptional()
  @IsEnum(OrderBy, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderBy;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}