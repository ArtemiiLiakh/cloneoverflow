import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { OrderBy } from '../types/OrderBy';
import { validationMessage } from '../utils/validationUtils';
import { PaginationDTO } from './pagination.dto';

export enum QuestionsSortByEnum {
  DATE = 'date',
  RATE = 'rate',
  ANSWERS = 'answers',
}

export class QuestionsGetAllDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsArray(validationMessage('Tags must be an array'))
    tags?: string[];
  
  @IsOptional()
  @IsEnum(QuestionsSortByEnum, validationMessage('SortBy must be a valid enum value: date, rate, answers'))
    sortBy?: QuestionsSortByEnum;
  
  @IsOptional()
  @IsEnum(OrderBy, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderBy;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;

  @IsOptional()
    ownerId?: string;
    
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, validationMessage('Rate from must be a number'))
    rateFrom?: number;
    
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, validationMessage('Rate to must be a number'))
    rateTo?: number;
}