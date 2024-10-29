import { QuestionStatusEnum } from "../enums";
import { VoteTypeEnum } from "../enums/VoteType";

export class AnswerGetResponse {
  id: string;
  text: string;
  rate: number;
  isSolution: boolean;
  owner?: {
    id: string;
    name: string;
    username: string;
    reputation: number;
  };
  question?: {
    id: string;
    title: string;
    rate: number;
    status: QuestionStatusEnum;
    views: number;
    createdAt: Date;
    updatedAt: Date;
  };
  voteType?: VoteTypeEnum | null;
  createdAt: Date;
  updatedAt: Date;
}