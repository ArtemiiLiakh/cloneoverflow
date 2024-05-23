import { QuestionStatus, Tag } from "../types";
import { PaginationResponse } from "./pagination.response";

export class MappedSearchQuestionResponse {
  id: string;
  title: string;
  text: string;
  rate: number;
  views: number;
  status: QuestionStatus;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  owner: {
    id: string;
    name: string;
    username: string;
    reputation: number;
  };
  answersAmount: number;
}

export class SearchQuestionsResponse {
  questions: MappedSearchQuestionResponse[];
  pagination: PaginationResponse;
}