import { Module } from '@nestjs/common';
import { QuestionServiceProvider } from '@web/di/providers/services/question/QuestionServiceProvider';
import { QuestionToggleFavoriteUseCaseProvider } from '@web/di/providers/services/question/usecases/ToggleFavoriteProvider';

import {
  QuestionAddViewerUseCaseProvider,
  QuestionCloseUseCaseProvider,
  QuestionCreateUseCaseProvider,
  QuestionDeleteUseCaseProvider,
  QuestionGetDetailsProvider,
  QuestionGetUseCaseProvider,
  QuestionGetVoteUseCaseProvider,
  QuestionOpenUseCaseProvider,
  QuestionUpdateUseCaseProvider,
  QuestionVoteUseCaseProvider,
} from '@web/di/providers/services/question/usecases';

@Module({
  providers: [
    QuestionCreateUseCaseProvider, 
    QuestionGetUseCaseProvider,
    QuestionAddViewerUseCaseProvider,
    QuestionCloseUseCaseProvider,
    QuestionDeleteUseCaseProvider,
    QuestionGetVoteUseCaseProvider,
    QuestionOpenUseCaseProvider,
    QuestionUpdateUseCaseProvider,
    QuestionVoteUseCaseProvider,
    QuestionGetDetailsProvider,
    QuestionToggleFavoriteUseCaseProvider,
    
    QuestionServiceProvider,
  ],

  exports: [
    QuestionCreateUseCaseProvider, 
    QuestionGetUseCaseProvider,
    QuestionAddViewerUseCaseProvider,
    QuestionCloseUseCaseProvider,
    QuestionDeleteUseCaseProvider,
    QuestionGetVoteUseCaseProvider,
    QuestionOpenUseCaseProvider,
    QuestionUpdateUseCaseProvider,
    QuestionVoteUseCaseProvider,
    QuestionGetDetailsProvider,
    QuestionToggleFavoriteUseCaseProvider,

    QuestionServiceProvider,
  ],
})
export class QuestionServiceModule {}