import { Module } from '@nestjs/common';
import { AnswerServiceModule } from './answer/service.module';
import { AuthServiceModule } from './auth/service.module';
import { QuestionServiceModule } from './question/service.module';
import { SearchServiceModule } from './search/service.module';
import { UserServiceModule } from './user/service.module';

@Module({
  imports: [
    UserServiceModule,
    SearchServiceModule,
    QuestionServiceModule,
    AuthServiceModule,
    AnswerServiceModule,
  ],
})
export class ServicesModule {}