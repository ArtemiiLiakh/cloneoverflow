import { QuestionStatusEnum } from '../enums/statuses/QuestionStatus';
import { PaginationResponse } from './pagination.response';

export class MappedUserGetQuestionResponse {
  id: string;
  title: string;
  text: string;
  rate: number;
  views: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  status: QuestionStatusEnum;
  answersAmount: number;
}

export class UserGetQuestionResponse {
  questions: MappedUserGetQuestionResponse[];
  pagination: PaginationResponse;
}