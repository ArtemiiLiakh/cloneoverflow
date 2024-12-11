import { PaginationResponse } from '@data/PaginationResponse';

export interface MappedSearchQuestionResponse {
  id: string;
  title: string;
  rate: number;
  views: number;
  isClosed: boolean;
  tags: string[];
  createdAt: Date;
  owner: {
    id: string;
    name: string;
    username: string;
    reputation: number;
  };
  answersAmount: number;
}

export interface SearchQuestionsResponse {
  questions: MappedSearchQuestionResponse[];
  pagination: PaginationResponse;
}