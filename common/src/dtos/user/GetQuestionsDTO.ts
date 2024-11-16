import { PaginationDTO } from '@data/PaginationDTO';
import { OrderByEnum } from '@enums/OrderBy';
import { QuestionsSortByEnum } from '@enums/sorts/QuestionsSortBy';
import { validationMessage } from '@utils/validationUtils';
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsOptional, ValidateNested } from "class-validator";

export class UserGetQuestionsDTO {
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
}