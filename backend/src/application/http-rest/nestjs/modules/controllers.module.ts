import { Module } from '@nestjs/common';
import { AnswerControllerModule } from './answer/controller.module';
import { AuthControllerModule } from './auth/controller.module';
import { QuestionControllerModule } from './question/controller.module';
import { SearchControllerModule } from './search/controller.module';
import { UserControllerModule } from './user/controller.module';

@Module({
  imports: [
    UserControllerModule,
    SearchControllerModule,
    QuestionControllerModule,
    AuthControllerModule,
    AnswerControllerModule,
  ],
})
export class ControllersModule {}