import { Question } from '@core/domain/entities/Question';

export type QuestionUpdateInput = {
  executorId: string,
  questionId: string, 
  data: {
    title?: string;
    text?: string;
    tags?: string[];
  }
};

export type QuestionUpdateOutput = Question;