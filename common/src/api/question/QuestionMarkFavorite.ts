import { questionPath } from './paths';

export const QuestionMarkFavoritePath = questionPath+'/:questionId/favorite';

export interface QuestionMarkFavoriteParams {
  questionId: string
}