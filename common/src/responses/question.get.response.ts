import { QuestionStatusEnum } from "../enums/statuses/QuestionStatus";
import { VoteTypeEnum } from "../enums/VoteType";
import { AnswerGetResponse } from "./answer.get.response";

export class QuestionGetResponse {
  id: string;
  owner?: {
    id: string;
    name: string;
    username: string;
    reputation: number;
  };
  title: string;
  text: string;
  rate: number;
  views: number;
  status: QuestionStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  voteType?: VoteTypeEnum | null;
  answers?: AnswerGetResponse[];
  tags?: string[];
}