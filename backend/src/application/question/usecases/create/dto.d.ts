import { Question } from '@core/question/Question';

export type QuestionCreateInput = {
  executorId: string, 
  data: {
    title: string;
    text: string;
    tags?: string[];
  },
};

export type QuestionCreateOutput = Question;
