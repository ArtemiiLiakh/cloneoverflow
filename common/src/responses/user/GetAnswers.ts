import { PaginationResponse } from '@data/PaginationResponse';

export interface MappedUserGetAnswerResponse {
  id: string;
  text: string;
  rating: number;
  isSolution: boolean;
  createdAt: Date;
  updatedAt: Date;
  question: {
    id: string;
    title: string;
    rating: number;
  };
}

export interface UserGetAnswersResponse {
  answers: MappedUserGetAnswerResponse[];
  pagination: PaginationResponse;
}