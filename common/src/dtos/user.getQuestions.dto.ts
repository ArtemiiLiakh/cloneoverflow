import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { OrderBy } from '../types/OrderBy';
import { validationMessage } from '../utils/validationUtils';
import { PaginationDTO } from './pagination.dto';

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