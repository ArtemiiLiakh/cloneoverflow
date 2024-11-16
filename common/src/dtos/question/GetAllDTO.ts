import { PaginationDTO } from '@data/PaginationDTO';
import { OrderByEnum } from '@enums/OrderBy';
import { QuestionsSortByEnum } from '@enums/sorts/QuestionsSortBy';
import { validationMessage } from '@utils/validationUtils';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class QuestionGetAllDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsArray(validationMessage('Tags must be an array'))
    tags?: string[];
  
  @IsOptional()
  @IsEnum(QuestionsSortByEnum, validationMessage(`SortBy must be a valid enum value: ${Object.values(QuestionsSortByEnum)}`))
    sortBy?: QuestionsSortByEnum;
  
  @IsOptional()
  @IsEnum(OrderByEnum, validationMessage(`OrderBy must be a valid enum value: ${Object.values(OrderByEnum)}`))
    orderBy?: OrderByEnum;
  
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