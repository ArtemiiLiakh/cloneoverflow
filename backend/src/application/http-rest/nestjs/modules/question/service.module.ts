import { Module } from '@nestjs/common';
import { QuestionServiceProvider } from '../../di/providers/services/question/QuestionServiceProvider';
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
} from '../../di/providers/services/question/usecases';
import { QuestionToggleFavoriteUseCaseProvider } from '../../di/providers/services/question/usecases/ToggleFavoriteProvider';

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