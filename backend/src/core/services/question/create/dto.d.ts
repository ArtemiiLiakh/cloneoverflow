import { Question } from '@core/models/Question';

export type QuestionCreateInput = {
  executorId: string, 
  data: {
    title: string;
    text: string;
    tags?: string[];
  },
};

export type QuestionCreateOutput = Question;
