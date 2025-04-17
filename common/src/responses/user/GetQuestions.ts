import { PaginationResponse } from '@data/PaginationResponse';

export interface MappedUserGetQuestionResponse {
  id: string;
  title: string;
  rating: number;
  views: number;
  tags: string[];
  createdAt: Date;
  isClosed: boolean;
  answersAmount: number;
}

export interface UserGetQuestionsResponse {
  questions: MappedUserGetQuestionResponse[];
  pagination: PaginationResponse;
}