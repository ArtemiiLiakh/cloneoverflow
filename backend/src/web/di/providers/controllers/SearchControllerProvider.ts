import { SearchController } from '@application/search/SearchController';
import { SearchService } from '@application/search/SearchService';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '@web/di/tokens/ControllerDITokens';
import { SearchServiceDIToken } from '@web/di/tokens/services';

export const SearchControllerProvider: Provider = {
  provide: ControllerDITokens.SearchController,
  useFactory: (searchService: SearchService) => new SearchController(searchService),
  inject: [SearchServiceDIToken],
};