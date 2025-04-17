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

    QuestionServiceProvider,
  ],
})
export class QuestionServiceModule {}