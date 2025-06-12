import { ExecutorPayload, TokenTypeEnum } from '@application/auth/data';
import { CoreResponse } from '@common/controllers/Response';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiEndpointDocumentation } from '../decorators/apiEndpoint.decorator';
import { Auth } from '../decorators/auth.decorator';
import { Executor } from '../decorators/executor.decorator';
import { CoreRes } from '../decorators/response.decorator';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';
import { SearchController } from '@application/search/SearchController';
import { SearchPaths } from '@cloneoverflow/common/api/search';
import { ApiSearchQuestionsQuery, ApiSearchQuestionsResponse, ApiSearchTagsQuery, ApiSearchTagsResponse } from '@web/dtos/search';

@ApiTags('search')
@Controller()
export class NestSearchController {
  constructor (
    @Inject(ControllerDITokens.SearchController) private readonly searchController: SearchController,
  ) {}

  @Get(SearchPaths.SearchTags)
  @ApiEndpointDocumentation({
    path: SearchPaths.SearchTags,
    summary: 'Search tags',
    operationId: 'Search tags',
    response: {
      statusCode: 200,
      type: ApiSearchTagsResponse,
    },
    useDataValidation: true,
  })
  async searchTags (
    @Query() query: ApiSearchTagsQuery, 
    @CoreRes() res: CoreResponse,
  ): Promise<ApiSearchTagsResponse> {
    return res.process(this.searchController.searchTags({ query }));
  }

  @Get(SearchPaths.SearchQuestions)
  @Auth({ tokenType: TokenTypeEnum.ACCESS, optional: true })
  @ApiEndpointDocumentation({
    path: SearchPaths.SearchTags,
    summary: 'Search questions',
    operationId: 'Search questions',
    response: {
      statusCode: 200,
      type: ApiSearchQuestionsResponse,
    },
    useDataValidation: true,
    useAuthValidation: {
      access: true,
      optional: true,
    },
  })
  searchQuestions (
    @Executor() executor: ExecutorPayload,
    @Query() query: ApiSearchQuestionsQuery,
    @CoreRes() res: CoreResponse,
  ): Promise<ApiSearchQuestionsResponse> {
    return res.process(this.searchController.searchQuestions({ executor, query }));
  }
}