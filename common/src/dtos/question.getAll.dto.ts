import { IsArray, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderBy } from "../types";
import { PaginationDTO } from "./pagination.dto";
import { validationMessage } from "../utils/validationUtils";
import { Type } from "class-transformer";

export enum QuestionGAQSortBy {
  RATE = "rate",
  DATE = "date",
  ANSWERS = "answers",
  STATUS = "status"
}

export enum QuestionFilterBy {
  ANSWERED = "answered",
  WEEKLY = "weekly",
  MONTHLY = "monthly"
}

export class QuestionGetAllDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsArray(validationMessage('Tags must be an array of strings'))
    tags?: string[];
  
  @IsOptional()
  @IsEnum(QuestionFilterBy, validationMessage('FilterBy must be a valid enum value: answered, weekly, monthly'))
    filterBy?: QuestionFilterBy;
  
  @IsOptional()
  @IsEnum(QuestionGAQSortBy, validationMessage('SortBy must be a valid enum value: rate, date, answers, status'))
    sortBy?: QuestionGAQSortBy;
  
  @IsOptional()
  @IsEnum(OrderBy, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderBy;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}