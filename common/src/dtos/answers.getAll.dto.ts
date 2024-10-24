import { IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { OrderBy } from '../types/OrderBy';
import { Type } from 'class-transformer';
import { PaginationDTO } from './pagination.dto';
import { validationMessage } from '../utils/validationUtils';

export enum AnswersSortByEnum {
  RATE = 'rate',
  DATE = 'date',
  SOLUTION = 'solution',
}

export class AnswersGetAllDTO {
  @IsOptional()
  @IsEnum(AnswersSortByEnum, validationMessage('SortBy must be a valid enum value: rate, date, solution'))
    sortBy?: AnswersSortByEnum

  @IsOptional()
  @IsEnum(OrderBy, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderBy;

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