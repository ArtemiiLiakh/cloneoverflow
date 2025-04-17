import { VoteTypeEnum } from '@enums/VoteType';

export interface QuestionGetResponse {
  id: string;
  title: string;
  text: string;
  rating: number;
  views: number;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    id: string;
    name: string;
    username: string;
    rating: number;
  } | null;
  tags: string[];
  myVoteType: VoteTypeEnum | null; 
}