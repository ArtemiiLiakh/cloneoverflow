import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { OrderBy } from '../types/OrderBy';
import { Type } from 'class-transformer';
import { PaginationDTO } from './pagination.dto';
import { validationMessage } from '../utils/validationUtils';

export enum UserGASortBy {
  RATE = 'rate',
  DATE = 'date',
  SOLUTION = 'solution',
}

export class UserGetAnswersDTO {
  @IsOptional()
  @IsEnum(UserGASortBy, validationMessage('SortBy must be a valid enum value: rate, date, solution'))
    sortBy?: UserGASortBy

  @IsOptional()
  @IsEnum(OrderBy, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderBy;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;

  @IsOptional()
    searchText?: string;
}