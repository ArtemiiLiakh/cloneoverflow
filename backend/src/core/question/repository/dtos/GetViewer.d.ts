import { Nullable } from '@common/utils/classTypes';
import { QuestionViewer } from '@core/question';

export type QuestionRepoGetViewerInput = {
  questionId: string,
  userId: string,
}

export type QuestionRepoGetViewerOutput = Nullable<QuestionViewer>; 