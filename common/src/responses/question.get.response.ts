import { QuestionStatus, Tag, UserStatus, VoteType } from "../types";
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
  views: number;
  status: QuestionStatus;
  voteType?: VoteType | null;
  answers: AnswerGetResponse[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}