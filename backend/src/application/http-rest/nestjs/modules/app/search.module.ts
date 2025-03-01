import { Module } from '@nestjs/common';
import { SearchControllerProvider } from '../../di/providers/controllers/SearchControllerProvider';
import { SearchServiceProvider } from '../../di/providers/services/search/SearchServiceProvider';
import {
  SearchQuestionsUseCaseProvider,
  SearchTagsUseCaseProvider,
} from '../../di/providers/services/search/usecases';

@Module({
  providers: [
    SearchTagsUseCaseProvider,
    SearchQuestionsUseCaseProvider,

    SearchServiceProvider,
    SearchControllerProvider,
  ],

  exports: [
    SearchTagsUseCaseProvider,
    SearchQuestionsUseCaseProvider,
    SearchServiceProvider,
    SearchControllerProvider,
  ],
})
export class SearchModule {}