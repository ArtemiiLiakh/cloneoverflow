import { Question } from '@core/domain/entities/Question';
import { Tag } from '@core/domain/entities/Tag';

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