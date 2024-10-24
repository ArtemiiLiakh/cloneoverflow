import { IsArray, IsEnum, IsOptional, ValidateNested } from "class-validator";
import { OrderBy } from "../types";
import { PaginationDTO } from "./pagination.dto";
import { validationMessage } from "../utils/validationUtils";
import { Type } from "class-transformer";

export enum SearchQuestionSortByEnum {
  RATE = "rate",
  DATE = "date",
  ANSWERS = "answers",
  VIEWS = "views",
  STATUS = "status"
}

export enum SearchQuestionFilterByEnum {
  CLOSED = "closed",
  ACTIVE = "active",
  WEEKLY = "weekly",
  MONTHLY = "monthly"
}

export class SearchQuestionsDTO {
  @IsOptional()
    search?: string;
  
  @IsOptional()
  @IsEnum(SearchQuestionFilterByEnum, validationMessage('FilterBy must be a valid enum value: answered, weekly, monthly', true))
    filterBy?: SearchQuestionFilterByEnum[];
  
  @IsOptional()
  @IsEnum(SearchQuestionSortByEnum, validationMessage('SortBy must be a valid enum value: rate, date, answers, status', true))
    sortBy?: SearchQuestionSortByEnum[];
  
  @IsOptional()
  @IsEnum(OrderBy, validationMessage('OrderBy must be a valid enum value: asc, desc'))
    orderBy?: OrderBy;
  
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}