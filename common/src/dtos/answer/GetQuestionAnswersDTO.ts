import { PaginationDTO } from '@dtos/PaginationDTO';
import { OrderByEnum } from '@enums/OrderBy';
import { AnswersSortByEnum } from '@enums/sorts';
import { Type } from 'class-transformer';
import { IsOptional, IsEnum, ValidateNested } from 'class-validator';

export class AnswerGetQuestionAnswersDTO {
  @IsOptional()
  @IsEnum(AnswersSortByEnum, { message: `Answer sortBy must be a valid enum value ${Object.values(AnswersSortByEnum)}` })
    sortBy?: AnswersSortByEnum;
  
  @IsOptional()
  @IsEnum(OrderByEnum, { message: `Answer orderBy must be a valid enum value ${Object.values(OrderByEnum)}` })
    orderBy?: OrderByEnum;

  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested()
    pagination?: PaginationDTO;
}