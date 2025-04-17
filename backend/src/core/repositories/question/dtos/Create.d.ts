import { Question } from '@core/models/question';

export type QuestionRepoCreateInput = {
  ownerId: string,
  title: string,
  text: string,
}

export type QuestionRepoCreateOutput = Question;
