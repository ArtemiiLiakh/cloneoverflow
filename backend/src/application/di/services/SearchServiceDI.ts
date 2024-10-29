import { SearchServiceFacade } from "@app/services/SearchServiceFacade";
import { SearchQuestionsUseCase } from "@core/service/search/usecase/searchQuestions";
import { SearchTagsUseCase } from "@core/service/search/usecase/searchTags";
import PrismaQuestionRepositoryDI from "../repositories/PrismaQuestionRepositoryDI";
import PrismaTagRepositoryDI from "../repositories/PrismaTagRepositoryDI";

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
