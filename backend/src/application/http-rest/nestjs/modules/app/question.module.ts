import { Module } from '@nestjs/common';
import { NestQuestionController } from '../../controllers/question.controller';
import { QuestionControllerProvider } from '../../di/providers/controllers/QuestionControllerProvider';
import { QuestionServiceProvider } from '../../di/providers/services/question/QuestionServiceProvider';
import {
  QuestionAddViewerUseCaseProvider,
  QuestionCloseUseCaseProvider,
  QuestionCreateUseCaseProvider,
  QuestionDeleteUseCaseProvider,
  QuestionGetManyUseCaseProvider,
  QuestionGetUseCaseProvider,
  QuestionGetVoteUseCaseProvider,
  QuestionOpenUseCaseProvider,
  QuestionUpdateUseCaseProvider,
  QuestionVoteUseCaseProvider,
} from '../../di/providers/services/question/usecases';
import { ValidatorModule } from '../validator.module';
import { SearchModule } from './search.module';

@Module({
  controllers: [NestQuestionController],
  providers: [
    QuestionCreateUseCaseProvider, 
    QuestionGetUseCaseProvider,
    QuestionAddViewerUseCaseProvider,
    QuestionCloseUseCaseProvider,
    QuestionDeleteUseCaseProvider,
    QuestionGetManyUseCaseProvider,
    QuestionGetVoteUseCaseProvider,
    QuestionOpenUseCaseProvider,
    QuestionUpdateUseCaseProvider,
    QuestionVoteUseCaseProvider,

    QuestionServiceProvider,
    QuestionControllerProvider,
  ],

  exports: [
    QuestionCreateUseCaseProvider, 
    QuestionGetUseCaseProvider,
    QuestionAddViewerUseCaseProvider,
    QuestionCloseUseCaseProvider,
    QuestionDeleteUseCaseProvider,
    QuestionGetManyUseCaseProvider,
    QuestionGetVoteUseCaseProvider,
    QuestionOpenUseCaseProvider,
    QuestionUpdateUseCaseProvider,
    QuestionVoteUseCaseProvider,

    QuestionServiceProvider,
  ],

  imports: [ValidatorModule, SearchModule],
})
export class QuestionModule {}