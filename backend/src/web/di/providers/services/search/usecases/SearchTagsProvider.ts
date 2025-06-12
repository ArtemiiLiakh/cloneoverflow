import { SearchTagsUseCase } from '@application/search/usecases';
import { TagRepository } from '@core/tag/repository/TagRepository';
import { Provider } from '@nestjs/common';
import { PrismaRepositoryDITokens } from '@web/di/tokens/persistence';
import { SearchUseCaseDITokens } from '@web/di/tokens/services';

export const SearchTagsUseCaseProvider: Provider = {
  provide: SearchUseCaseDITokens.SearchTags,
  useFactory: (tagRepository: TagRepository) => new SearchTagsUseCase(tagRepository),
  inject: [PrismaRepositoryDITokens.TagRepository],
};