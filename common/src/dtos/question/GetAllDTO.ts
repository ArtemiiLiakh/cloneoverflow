import { PaginationDTO } from '@dtos/PaginationDTO';
import { OrderByEnum } from '@enums/OrderBy';
import { QuestionsSortByEnum } from '@enums/sorts/QuestionsSortBy';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class QuestionGetAllDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsArray({ message: 'Tags must be an array' })
    tags?: string[];
  
  @IsOptional()
  @IsEnum(QuestionsSortByEnum, { message: `SortBy must be a valid enum value: ${Object.values(QuestionsSortByEnum)}` })
    sortBy?: QuestionsSortByEnum;
  
  @IsOptional()
  @IsEnum(OrderByEnum, { message: `OrderBy must be a valid enum value: ${Object.values(OrderByEnum)}` })
    orderBy?: OrderByEnum;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;

  @IsOptional()
    ownerId?: string;
    
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Rate from must be a number' })
    rateFrom?: number;
    
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Rate to must be a number' })
    rateTo?: number;
}