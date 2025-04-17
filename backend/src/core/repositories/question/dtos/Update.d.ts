import { Question } from '@core/models/question';

export type QuestionRepoUpdateInput = {
  questionId: string,
  data: {
    title?: string,
    text?: string,
  }
}

export type QuestionRepoUpdateOutput = Question;