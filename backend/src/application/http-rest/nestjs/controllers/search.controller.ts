import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';
import { SearchController } from '@application/controllers/SearchController';
import { SearchQuestionsDTO, SearchTagsDTO } from '@cloneoverflow/common';
import { CoreRes } from '../decorators/response.decorator';
import { CoreResponse } from '@application/controllers/types/Response';

@Controller()
export class NestSearchController {
  constructor (
    @Inject(ControllerDITokens.SearchController) private searchController: SearchController,
  ) {}

  @Get('/tags/search')
  searchTags (@Query() query: SearchTagsDTO, @CoreRes() res: CoreResponse): Promise<void> {
    return this.searchController.searchTags({
      query,
    }, res);
  }

  @Get('/questions/search')
  searchQuestions (
    @Query() query: SearchQuestionsDTO,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.searchController.searchQuestions({
      query,
    }, res);
  }
}