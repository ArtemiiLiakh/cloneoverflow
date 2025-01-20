import { SearchServiceFacade } from '@application/services/SearchServiceFacade';
import { SearchQuestionsUseCase } from '@core/services/search/searchQuestions/usecase';
import { SearchTagsUseCase } from '@core/services/search/searchTags/usecase';
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
