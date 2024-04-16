import express from 'express';
import { SearchController } from '../controllers/search.controller';
import { validateRequest } from '../middlewares/validation';
import { SearchTagsDTO } from '@cloneoverflow/common';

const router = express.Router();
const searchController = new SearchController();

router.get('/search', validateRequest({
  query: SearchTagsDTO,
}), searchController.getTags.bind(searchController));

export {
  router as tags,
}