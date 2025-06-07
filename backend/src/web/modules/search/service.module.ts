import { Module } from '@nestjs/common';
import { SearchServiceProvider } from '@web/di/providers/services/search/SearchServiceProvider';
import { SearchQuestionsUseCaseProvider, SearchTagsUseCaseProvider } from '@web/di/providers/services/search/usecases';

@Module({
  providers: [
    SearchTagsUseCaseProvider,
    SearchQuestionsUseCaseProvider,

    SearchServiceProvider,
  ],

  exports: [
    SearchTagsUseCaseProvider,
    SearchQuestionsUseCaseProvider,
    
    SearchServiceProvider,
  ],
})
export class SearchServiceModule {}