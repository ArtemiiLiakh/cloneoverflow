import { IsArray, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderBy } from "../types";
import { PaginationDTO } from "./pagination.dto";
import { validationMessage } from "../utils/validationUtils";
import { Type } from "class-transformer";

export enum SearchQuestionSortBy {
  RATE = "rate",
  DATE = "date",
  ANSWERS = "answers",
  STATUS = "status"
}

export enum SearchQuestionFilterBy {
  CLOSED = "closed",
  ACTIVE = "active",
  WEEKLY = "weekly",
  MONTHLY = "monthly"
}

export class SearchQuestionsDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsEnum(SearchQuestionFilterBy, validationMessage('FilterBy must be a valid enum value: answered, weekly, monthly', true))
    filterBy?: SearchQuestionFilterBy[];
  
  @IsOptional()
  @IsEnum(SearchQuestionSortBy, validationMessage('SortBy must be a valid enum value: rate, date, answers, status', true))
    sortBy?: SearchQuestionSortBy[];
  
  @IsOptional()
  @IsEnum(OrderBy, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderBy;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}