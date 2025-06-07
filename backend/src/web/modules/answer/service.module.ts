import { Module } from '@nestjs/common';
import { AnswerServiceProvider } from '@web/di/providers/services/answer/AnswerServiceProvider';
import { AnswerGetByQuestionProvider } from '@web/di/providers/services/answer/usecases/GetQuestionAnswersProvider';

import {
  AnswerCreateUseCaseProvider,
  AnswerDeleteUseCaseProvider,
  AnswerGetUseCaseProvider,
  AnswerGetVoterUseCaseProvider,
  AnswerUpdateUseCaseProvider,
  AnswerVoteUseCaseProvider,
} from '@web/di/providers/services/answer/usecases';

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