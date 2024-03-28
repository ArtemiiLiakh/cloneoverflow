import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';
import { validationMessage } from '../utils/validationUtils';

export class PaginationDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, validationMessage('Page must be a number'))
    page?: number;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, validationMessage('PageSize must be a number'))
    pageSize?: number;
}