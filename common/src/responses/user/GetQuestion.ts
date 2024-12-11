import { PaginationResponse } from '@data/PaginationResponse';

export interface MappedUserGetQuestionResponse {
  id: string;
  title: string;
  rate: number;
  views: number;
  tags: string[];
  createdAt: Date;
  isClosed: boolean;
  answersAmount: number;
}

export interface UserGetQuestionResponse {
  questions: MappedUserGetQuestionResponse[];
  pagination: PaginationResponse;
}