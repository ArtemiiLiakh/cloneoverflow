import { Module } from '@nestjs/common';
import { AnswerModule } from './answer.module';
import { QuestionModule } from './question.module';
import { SearchModule } from './search.module';
import { TagModule } from './tag.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule, 
    SearchModule, 
    QuestionModule, 
    AnswerModule,
    TagModule,
  ],
})
export class CoreModule {}