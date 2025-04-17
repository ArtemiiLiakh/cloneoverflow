import { Module } from '@nestjs/common';
import { AnswerServiceProvider } from '../../di/providers/services/answer/AnswerServiceProvider';
import {
  AnswerCreateUseCaseProvider,
  AnswerDeleteUseCaseProvider,
  AnswerGetUseCaseProvider,
  AnswerGetVoterUseCaseProvider,
  AnswerUpdateUseCaseProvider,
  AnswerVoteUseCaseProvider,
} from '../../di/providers/services/answer/usecases';
import { AnswerGetByQuestionProvider } from '../../di/providers/services/answer/usecases/GetQuestionAnswersProvider';

@Module({
  providers: [
    AnswerCreateUseCaseProvider,
    AnswerDeleteUseCaseProvider,
    AnswerGetUseCaseProvider,
    AnswerGetVoterUseCaseProvider,
    AnswerUpdateUseCaseProvider,
    AnswerVoteUseCaseProvider,
    AnswerGetByQuestionProvider,

    AnswerServiceProvider,
  ],
  exports: [
    AnswerCreateUseCaseProvider,
    AnswerDeleteUseCaseProvider,
    AnswerGetUseCaseProvider,
    AnswerGetVoterUseCaseProvider,
    AnswerUpdateUseCaseProvider,
    AnswerVoteUseCaseProvider,
    AnswerGetByQuestionProvider,
    
    AnswerServiceProvider,
  ],
})
export class AnswerServiceModule {}