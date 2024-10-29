import { AdaptController } from '@app/adapters/AdaptController';
import { SearchController } from '@app/controllers/SearchController';
import { searchServiceFacadeDI } from '@app/di/services/SearchServiceDI';
import { validateRequest } from '@app/middlewares/validation';
import { SearchTagsDTO } from '@cloneoverflow/common';
import express from 'express';

const tagRouter = express.Router();

const searchController = new SearchController(searchServiceFacadeDI);

tagRouter.get(
  '/search',
  validateRequest({
    query: SearchTagsDTO,
  }),
  AdaptController(searchController.searchTags.bind(searchController)), 
);

export { tagRouter };