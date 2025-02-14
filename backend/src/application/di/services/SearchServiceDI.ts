import {
  SearchQuestionsUseCase,
  SearchTagsUseCase,
} from '@core/services/search';

import {
  PrismaQuestionRepositoryDI,
  PrismaTagRepositoryDI,
} from '../repositories/PrismaRepositoriesDI';

import { SearchServiceFacade } from '@application/facades/SearchServiceFacade';

const SearchQuestionsUseCaseDI = new SearchQuestionsUseCase(PrismaQuestionRepositoryDI);
const SearchTagsUseCaseDI = new SearchTagsUseCase(PrismaTagRepositoryDI);

export const searchServiceFacadeDI = SearchServiceFacade.new({
  searchQuestionsUseCase: SearchQuestionsUseCaseDI,
  searchTagsUseCase: SearchTagsUseCaseDI,
});

export const searchUseCasesDI = {
  SearchQuestionsUseCaseDI,
  SearchTagsUseCaseDI,
};
