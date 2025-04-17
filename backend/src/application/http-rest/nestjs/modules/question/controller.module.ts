import { Module } from '@nestjs/common';
import { NestQuestionController } from '../../controllers/question.controller';
import { QuestionControllerProvider } from '../../di/providers/controllers/QuestionControllerProvider';
import { AnswerServiceModule } from '../answer/service.module';
import { QuestionServiceModule } from './service.module';

@Module({
  controllers: [NestQuestionController],
  providers: [QuestionControllerProvider],
  imports: [QuestionServiceModule, AnswerServiceModule],
})
export class QuestionControllerModule {}