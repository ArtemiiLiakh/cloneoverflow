import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { Tag } from '@core/domain/entities/Tag';

export type QuestionGetInput = {
  executorId?: string,
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
  voter?: QuestionUser,
};