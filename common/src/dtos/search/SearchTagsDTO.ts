import { PaginationDTO } from '@dtos/PaginationDTO';
import { OrderByEnum } from '@enums/OrderBy';
import { SearchTagsSortByEnum } from '@enums/sorts/SearchTagsSortBy';
import { Type } from "class-transformer";
import { IsEnum, IsOptional, ValidateNested } from "class-validator";

export class SearchTagsDTO {
  @IsOptional()
    name?: string;
    
  @IsOptional()
  @IsEnum(SearchTagsSortByEnum, { 
    message: `SortBy must be a valid enum value: ${Object.values(SearchTagsSortByEnum)}`,
  })
    sortBy?: SearchTagsSortByEnum;
    
  @IsOptional()
  @IsEnum(OrderByEnum, { 
    message: `OrderBy must be a valid enum value: ${Object.values(OrderByEnum)}`,
  })
    orderBy?: OrderByEnum;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}