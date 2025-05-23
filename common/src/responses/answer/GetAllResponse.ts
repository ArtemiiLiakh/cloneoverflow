import { PaginationResponse } from '@data/PaginationResponse';
import { VoteTypeEnum } from '@enums/VoteType';

export interface MappedAnswerGetAllResponse {
  id: string;
  text: string;
  rate: number;
  isSolution: boolean;
  owner?: {
    id: string;
    name: string;
    username: string;
    reputation: number;
  } | null;
  questionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnswerGetAllResponse {
  answers: MappedAnswerGetAllResponse[],
  pagination: PaginationResponse,
}