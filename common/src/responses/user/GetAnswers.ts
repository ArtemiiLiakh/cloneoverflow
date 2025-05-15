import { PaginationResponse } from '@data/PaginationResponse';

export interface MappedUserGetAnswerResponse {
  id: string;
  text: string;
  rate: number;
  isSolution: boolean;
  createdAt: Date;
  updatedAt: Date;
  question: {
    id: string;
    title: string;
    rate: number;
  };
}

export interface UserGetAnswersResponse {
  answers: MappedUserGetAnswerResponse[];
  pagination: PaginationResponse;
}