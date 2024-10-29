import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { AnswersSortByEnum } from '../enums/sorts/AnswersSortBy';
import { validationMessage } from '../utils/validationUtils';
import { PaginationDTO } from './pagination.dto';
import { OrderByEnum } from '../enums/OrderBy';

export class AnswersGetAllDTO {
  @IsOptional()
  @IsEnum(AnswersSortByEnum, validationMessage('SortBy must be a valid enum value'))
    sortBy?: AnswersSortByEnum

  @IsOptional()
  @IsEnum(OrderByEnum, validationMessage('OrderBy must be a valid enum value'))
    orderBy?: OrderByEnum;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;

  @IsOptional()
    searchText?: string;

  @IsOptional()
    ownerId?: string;
    
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
    rateFrom?: number;
    
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
    rateTo?: number;
}