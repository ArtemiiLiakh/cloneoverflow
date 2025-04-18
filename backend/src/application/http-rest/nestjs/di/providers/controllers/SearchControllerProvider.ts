import { SearchController } from '@application/controllers/SearchController';
import { SearchServiceFacade } from '@application/service-facades/SearchServiceFacade';
import { Provider } from '@nestjs/common';
import { ControllerDITokens } from '../../tokens/ControllerDITokens';
import { SearchServiceDIToken } from '../../tokens/services';

export const SearchControllerProvider: Provider = {
  provide: ControllerDITokens.SearchController,
  useFactory: (searchService: SearchServiceFacade) => new SearchController(searchService),
  inject: [SearchServiceDIToken],
};