import { VoteType } from "../types";

export class AnswerGetResponse {
  id: string;
  text: string;
  rate: number;
  isSolution: boolean;
  owner: {
    id: string;
    name: string;
    username: string;
    reputation: number;
  };
  voteType?: VoteType | null;
  createdAt: Date;
  updatedAt: Date;
}