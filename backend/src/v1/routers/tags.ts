import { SearchController } from '@/v1/controllers/search.controller';
import { validateRequest } from '@/v1/middlewares/validation';
import { questionService, tagsService } from '@/v1/services';
import { SearchTagsDTO } from '@cloneoverflow/common';
import express from 'express';

const tags = express.Router();
const searchController = new SearchController(questionService, tagsService);

tags.get('/search', validateRequest({
  query: SearchTagsDTO,
}), searchController.searchTags.bind(searchController));

export { tags };
