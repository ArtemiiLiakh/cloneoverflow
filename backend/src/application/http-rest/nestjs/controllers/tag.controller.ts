import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ControllerDITokens } from '../di/tokens/ControllerDITokens';
import { SearchController } from '@application/controllers/SearchController';
import { SearchTagsDTO } from '@cloneoverflow/common';
import { CoreRes } from '../decorators/response.decorator';
import { CoreResponse } from '@application/controllers/types/Response';

@Controller('tags')
export class NestTagController {
  constructor (
    @Inject(ControllerDITokens.SearchController) private searchContoller: SearchController,
  ) {}

  @Get('/')
  search (@Query() query: SearchTagsDTO, @CoreRes() res: CoreResponse) {
    return this.searchContoller.searchTags({
      query,
    }, res);
  }
}