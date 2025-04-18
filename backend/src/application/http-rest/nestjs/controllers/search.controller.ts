import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';
import { SearchController } from '@application/controllers/SearchController';
import { SearchQuestionsDTO, SearchTagsDTO } from '@cloneoverflow/common';
import { CoreRes } from '../decorators/response.decorator';
import { CoreResponse } from '@application/controllers/types/Response';
import { Executor } from '../decorators/executor.decorator';
import { ExecutorPayload, TokenTypeEnum } from '@application/services/auth/data';
import { Auth } from '../decorators/auth.decorator';

@Controller()
export class NestSearchController {
  constructor (
    @Inject(ControllerDITokens.SearchController) private searchController: SearchController,
  ) {}

  @Get('/tags/search')
  searchTags (
    @Query() query: SearchTagsDTO, 
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.searchController.searchTags({
      query,
    }, res);
  }

  @Auth({ tokenType: TokenTypeEnum.ACCESS, optinoal: true })
  @Get('/questions/search')
  searchQuestions (
    @Executor() executor: ExecutorPayload,
    @Query() query: SearchQuestionsDTO,
    @CoreRes() res: CoreResponse,
  ): Promise<void> {
    return this.searchController.searchQuestions({
      executor,
      query,
    }, res);
  }
}