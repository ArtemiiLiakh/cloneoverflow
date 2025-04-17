import { Module } from '@nestjs/common';
import { NestAnswerController } from '../../controllers/answer.controller';
import { AnswerControllerProvider } from '../../di/providers/controllers/AnswerControllerProvider';
import { AnswerServiceModule } from './service.module';

@Module({
  controllers: [NestAnswerController],
  providers: [AnswerControllerProvider],
  imports: [AnswerServiceModule],
})
export class AnswerControllerModule {}