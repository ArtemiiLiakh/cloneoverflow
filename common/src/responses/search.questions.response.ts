import { QuestionStatusEnum } from "../enums/statuses/QuestionStatus";
import { PaginationResponse } from "./pagination.response";

export class MappedSearchQuestionResponse {
  id: string;
  title: string;
  text: string;
  rate: number;
  views: number;
  status: QuestionStatusEnum;
  tags: string[];
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