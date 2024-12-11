import { VoteTypeEnum } from '@enums/VoteType';

export interface AnswerGetResponse {
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
    isClosed: boolean;
  };
  voteType?: VoteTypeEnum | null;
  createdAt: Date;
  updatedAt: Date;
}