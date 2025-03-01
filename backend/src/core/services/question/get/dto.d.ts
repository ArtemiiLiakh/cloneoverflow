import { Question } from '@core/models/Question';
import { Tag } from '@core/models/Tag';

export type QuestionGetInput = {
  questionId: string, 
};

export type QuestionGetOutput = {
  entity: Question,
  tags?: Tag[],
  owner?: {
    id: string,
    username: string,
    name: string,
    rating: number,
  } | null,
};