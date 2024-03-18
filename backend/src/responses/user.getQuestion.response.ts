import { QuestionStatus, Tag } from '@prisma/client';
import { PaginationResponse } from './pagination.response';

export class MappedUserGetQuestionResponse {
  id: string;
  userId: string;
  title: string;
  text: string;
  rate: number;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  status: QuestionStatus;
  answersAmount: number;
}

export class UserGetQuestionResponse {
  questions: MappedUserGetQuestionResponse[];
  pagination: PaginationResponse;
}