import { Module } from '@nestjs/common';
import { NestAnswerController } from '../../controllers/answer.controller';
import { AnswerControllerProvider } from '../../di/providers/controllers/AnswerControllerProvider';
import { AnswerServiceProvider } from '../../di/providers/services/answer/AnswerServiceProvider';
import {
  AnswerCreateUseCaseProvider,
  AnswerDeleteUseCaseProvider,
  AnswerGetManyUseCaseProvider,
  AnswerGetUseCaseProvider,
  AnswerGetVoteUseCaseProvider,
  AnswerUpdateUseCaseProvider,
  AnswerVoteUseCaseProvider,
} from '../../di/providers/services/answer/usecases';
import { ValidatorModule } from '../validator.module';
import { SearchModule } from './search.module';

@Module({
  controllers: [NestAnswerController],
  providers: [
    AnswerCreateUseCaseProvider,
    AnswerDeleteUseCaseProvider,
    AnswerGetUseCaseProvider,
    AnswerGetManyUseCaseProvider,
    AnswerGetVoteUseCaseProvider,
    AnswerUpdateUseCaseProvider,
    AnswerVoteUseCaseProvider,
    
    AnswerServiceProvider,
    AnswerControllerProvider,
  ],
  exports: [
    AnswerCreateUseCaseProvider,
    AnswerDeleteUseCaseProvider,
    AnswerGetUseCaseProvider,
    AnswerGetManyUseCaseProvider,
    AnswerGetVoteUseCaseProvider,
    AnswerUpdateUseCaseProvider,
    AnswerVoteUseCaseProvider,
    AnswerServiceProvider,
  ],
  imports: [ValidatorModule, SearchModule],
})
export class AnswerModule {}