import { QuestionStatus, Tag, UserStatus } from "../types";
import { AnswerGetResponse } from "./answer.get.response";

export class QuestionGetResponse {
  id: string;
  owner: {
    id: string;
    name: string;
    username: string;
    reputation: number;
  };
  title: string;
  text: string;
  rate: number;
  status: QuestionStatus;
  answers: AnswerGetResponse[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}