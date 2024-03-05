import { PaginationResponse } from './pagination.response';

export class MappedUserGetAnswerResponse {
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

export class UserGetAnswersResponse {
  answers: MappedUserGetAnswerResponse[];
  pagination: PaginationResponse;
}