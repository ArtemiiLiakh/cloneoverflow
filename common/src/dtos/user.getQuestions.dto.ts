import { Type } from "class-transformer";
import { IsArray, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderByEnum } from "../enums/OrderBy";
import { QuestionsSortByEnum } from "../enums/sorts/QuestionsSortBy";
import { validationMessage } from "../utils/validationUtils";
import { PaginationDTO } from "./pagination.dto";

export class UserGetQuestionsDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsArray(validationMessage('Tags must be an array'))
    tags?: string[];
  
  @IsOptional()
  @IsEnum(QuestionsSortByEnum, validationMessage('SortBy must be a valid enum value: date, rate, answers'))
    sortBy?: QuestionsSortByEnum;
  
  @IsOptional()
  @IsEnum(OrderByEnum, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderByEnum;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}