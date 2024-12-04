import { SearchServiceFacade } from '@application/services/SearchServiceFacade';
import { SearchQuestionsUseCase } from '@core/services/search/usecases/searchQuestions';
import { SearchTagsUseCase } from '@core/services/search/usecases/searchTags';
import { 
  PrismaQuestionRepositoryDI, 
  PrismaTagRepositoryDI,
} from '../repositories/PrismaRepositoriesDI';

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
