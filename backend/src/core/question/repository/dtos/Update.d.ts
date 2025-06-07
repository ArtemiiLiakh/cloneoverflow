import { Question } from '@core/question';

export type QuestionRepoUpdateInput = {
  questionId: string,
  data: {
    title?: string,
    text?: string,
  }
}

export type QuestionRepoUpdateOutput = Question;