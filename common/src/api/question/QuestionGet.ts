import { VoteTypeEnum } from '@enums/VoteType';
import { questionPath } from './paths';

export const QuestionGetPath = questionPath+'/:questionId';

export interface QuestionGetParams {
  questionId: string
}

export interface QuestionGetResponse {
  id: string;
  title: string;
  text: string;
  rating: number;
  views: number;
  isClosed: boolean;
  isFavorite: boolean;
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