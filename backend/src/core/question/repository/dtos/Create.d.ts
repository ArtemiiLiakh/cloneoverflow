import { Question } from '@core/question';

export type QuestionRepoCreateInput = {
  ownerId: string,
  title: string,
  text: string,
}

export type QuestionRepoCreateOutput = Question;
