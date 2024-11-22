import { PaginationDTO } from '@data/PaginationDTO';
import { OrderByEnum } from '@enums/OrderBy';
import { SearchTagsSortByEnum } from '@enums/sorts/SearchTagsSortBy';
import { validationMessage } from '@utils/validationUtils';
import { Type } from "class-transformer";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";

export class SearchTagsDTO {
  @IsOptional()
    name?: string;
    
  @IsOptional()
  @IsEnum(SearchTagsSortByEnum, validationMessage(`SortBy must be a valid enum value: ${Object.values(SearchTagsSortByEnum)}`))
    sortBy?: SearchTagsSortByEnum;
    
  @IsOptional()
  @IsEnum(OrderByEnum, validationMessage(`OrderBy must be a valid enum value: ${Object.values(OrderByEnum)}`))
    orderBy?: OrderByEnum;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}