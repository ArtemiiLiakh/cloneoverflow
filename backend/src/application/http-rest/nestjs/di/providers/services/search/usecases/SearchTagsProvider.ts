import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { SearchUseCaseDITokens } from '@application/http-rest/nestjs/di/tokens/services';
import { TagRepository } from '@core/repositories';
import { SearchTagsUseCase } from '@core/services/search';
import { Provider } from '@nestjs/common';

export const SearchTagsUseCaseProvider: Provider = {
  provide: SearchUseCaseDITokens.SearchTags,
  useFactory: (tagRepository: TagRepository) => new SearchTagsUseCase(tagRepository),
  inject: [PrismaRepositoryDITokens.TagRepository],
};