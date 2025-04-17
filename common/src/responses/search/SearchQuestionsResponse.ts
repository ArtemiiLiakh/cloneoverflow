import { PaginationResponse } from '@data/PaginationResponse';

export interface MappedSearchQuestionResponse {
  id: string;
  title: string;
  rating: number;
  views: number;
  isClosed: boolean;
  tags: string[];
  createdAt: Date;
  owner: {
    id: string;
    name: string;
    username: string;
    rating: number;
  } | null;
  answersAmount: number;
}

export interface SearchQuestionsResponse {
  questions: MappedSearchQuestionResponse[];
  pagination: PaginationResponse;
}