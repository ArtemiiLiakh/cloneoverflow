import { QuestionStatus, Tag } from "../types";
import { PaginationResponse } from "./pagination.response";

export class MappedGetAllResponse {
  id: string;
  title: string;
  text: string;
  rate: number;
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
export class QuestionGetAllResponse {
  questions: MappedGetAllResponse[];
  pagination: PaginationResponse;
}