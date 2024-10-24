import { Type } from "class-transformer";
import { IsArray, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderBy } from "../types";
import { validationMessage } from "../utils/validationUtils";
import { PaginationDTO } from "./pagination.dto";
import { QuestionsSortByEnum } from "./questions.getAll.dto";

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
  @IsEnum(OrderBy, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderBy;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}