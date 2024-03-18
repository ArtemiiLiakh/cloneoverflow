import { IsArray, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { OrderBy } from '../types/OrderBy';
import { validationMessage } from '../utils/functionUtils';
import { PaginationDTO } from './pagination.dto';
import { Type } from 'class-transformer';

export enum UserGQSortBy {
  DATE = 'date',
  RATE = 'rate',
  ANSWERS = 'answers',
}

export class UserGetQuestionsDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsArray(validationMessage('Tags must be an array'))
    tags?: string[];
  
  @IsOptional()
  @IsNumber({}, validationMessage('MinRate must be a number'))
    minRate?: number;
  
  @IsOptional()
  @IsEnum(UserGQSortBy, validationMessage('SortBy must be a valid enum value: date, rate, answers'))
    sortBy?: UserGQSortBy;
  
  @IsOptional()
  @IsEnum(OrderBy, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderBy;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}