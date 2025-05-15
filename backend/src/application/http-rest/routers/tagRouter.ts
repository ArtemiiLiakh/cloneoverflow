import { AdaptController } from '@application/adapters/AdaptController';
import { SearchController } from '@application/controllers/SearchController';
import { searchServiceFacadeDI } from '@application/di/services/SearchServiceDI';
import { validateRequest } from '@application/middlewares/validators/ValidateRequest';
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
