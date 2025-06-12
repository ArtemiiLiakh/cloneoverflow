import { questionPath } from './paths';

export const QuestionRemoveFavoritePath = questionPath+'/:questionId/favorite';

export interface QuestionRemoveFavoriteParams {
  questionId: string
}