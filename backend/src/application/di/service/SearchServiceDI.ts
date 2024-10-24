import { SearchServiceFacade } from "@app/services/SearchServiceFacade";
import { SearchQuestionsUseCase } from "@core/service/search/usecase/searchQuestions";
import { SearchTagsUseCase } from "@core/service/search/usecase/searchTags";
import PrismaQuestionRepositoryDI from "../repositories/PrismaQuestionRepositoryDI";
import PrismaTagRepositoryDI from "../repositories/PrismaTagRepositoryDI";

export const searchServiceFacadeDI = new SearchServiceFacade(
  new SearchQuestionsUseCase(PrismaQuestionRepositoryDI),
  new SearchTagsUseCase(PrismaTagRepositoryDI),
);

export const searchUseCasesDI = {
  SearchQuestionsUseCase: new SearchQuestionsUseCase(PrismaQuestionRepositoryDI),
  SearchTagsUseCase: new SearchTagsUseCase(PrismaTagRepositoryDI),
};
