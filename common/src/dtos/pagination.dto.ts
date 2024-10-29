import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationInput } from '../data/PaginationInput';
import { validationMessage } from '../utils/validationUtils';

export class PaginationDTO implements PaginationInput {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, validationMessage('Page must be a number'))
    page?: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, validationMessage('PageSize must be a number'))
    pageSize?: number;
}