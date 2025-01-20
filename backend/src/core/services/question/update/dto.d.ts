import { Question } from '@core/domain/entities/Question';

export type QuestionUpdateInput = {
  questionId: string, 
  data: {
    title?: string;
    text?: string;
    tags?: string[];
  }
};

export type QuestionUpdateOutput = Question;