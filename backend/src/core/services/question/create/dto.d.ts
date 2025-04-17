import { Question } from '@core/models/question/Question';

export type QuestionCreateInput = {
  executorId: string, 
  data: {
    title: string;
    text: string;
    tags?: string[];
  },
};

export type QuestionCreateOutput = Question;
