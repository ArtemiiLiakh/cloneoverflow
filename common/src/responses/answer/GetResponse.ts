import { VoteTypeEnum } from '@enums/VoteType';

export interface AnswerGetResponse {
  id: string;
  questionId: string,
  text: string;
  rating: number;
  isSolution: boolean;
  owner: {
    id: string;
    name: string;
    username: string;
    rating: number;
  } | null;
  myVoteType: VoteTypeEnum | null;
  createdAt: Date;
  updatedAt: Date;
}