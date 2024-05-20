import { QuestionStatus } from '../types/QuestionStatus';
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
  status: QuestionStatus;
  answersAmount: number;
}

export class UserGetQuestionResponse {
  questions: MappedUserGetQuestionResponse[];
  pagination: PaginationResponse;
}