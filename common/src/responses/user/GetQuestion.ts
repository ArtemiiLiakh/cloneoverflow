import { PaginationResponse } from '@data/PaginationResponse';

export interface MappedUserGetQuestionResponse {
  id: string;
  title: string;
  text: string;
  rate: number;
  views: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isClosed: boolean;
  answersAmount: number;
}

export interface UserGetQuestionResponse {
  questions: MappedUserGetQuestionResponse[];
  pagination: PaginationResponse;
}