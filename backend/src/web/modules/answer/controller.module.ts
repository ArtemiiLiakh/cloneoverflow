import { Module } from '@nestjs/common';
import { NestAnswerController } from '@web/controllers/answer.controller';
import { AnswerControllerProvider } from '@web/di/providers/controllers/AnswerControllerProvider';
import { AnswerServiceModule } from './service.module';

@Module({
  controllers: [NestAnswerController],
  providers: [AnswerControllerProvider],
  imports: [AnswerServiceModule],
})
export class AnswerControllerModule {}