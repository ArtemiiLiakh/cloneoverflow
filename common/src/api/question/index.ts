import { QuestionAddViewerPath } from './QuestionAddViewer';
import { QuestionClosePath } from './QuestionClose';
import { QuestionCreatePath } from './QuestionCreate';
import { QuestionDeletePath } from './QuestionDelete';
import { QuestionRemoveFavoritePath } from './QuestionRemoveFavorite';
import { QuestionGetAnswersPath } from './QuestionGetAnswers';
import { QuestionGetPath } from './QuestionGet';
import { QuestionGetVotePath } from './QuestionGetVote';
import { QuestionMarkFavoritePath } from './QuestionMarkFavorite';
import { QuestionOpenPath } from './QuestionOpen';
import { QuestionUpdatePath } from './QuestionUpdate';
import { QuestionVoteDownPath } from './QuestionVoteDown';
import { QuestionVoteUpPath } from './QuestionVoteUp';
import { questionPath } from './paths';

export * from './QuestionAddViewer';
export * from './QuestionClose';
export * from './QuestionCreate';
export * from './QuestionDelete';
export * from './QuestionRemoveFavorite';
export * from './QuestionGetAnswers';
export * from './QuestionGet';
export * from './QuestionGetVote';
export * from './QuestionMarkFavorite';
export * from './QuestionOpen';
export * from './QuestionUpdate';
export * from './QuestionVoteDown';
export * from './QuestionVoteUp';

export const QuestionPaths = {
  MainPath: questionPath,
  AddViewer: QuestionAddViewerPath,
  Close: QuestionClosePath,
  Create: QuestionCreatePath,
  Delete: QuestionDeletePath,
  RemoveFavorite: QuestionRemoveFavoritePath,
  GetAnswers: QuestionGetAnswersPath,
  Get: QuestionGetPath,
  GetVote: QuestionGetVotePath,
  MarkFavorite: QuestionMarkFavoritePath,
  Open: QuestionOpenPath,
  Update: QuestionUpdatePath,
  VoteDown: QuestionVoteDownPath,
  VoteUp: QuestionVoteUpPath,
};