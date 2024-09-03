import { SearchController } from '@/controllers/search.controller';
import { validateRequest } from '@/middlewares/validation';
import { questionService, tagsService } from '@/services';
import { SearchTagsDTO } from '@cloneoverflow/common';
import express from 'express';

const tags = express.Router();
const searchController = new SearchController(questionService, tagsService);

tags.get('/search', validateRequest({
  query: SearchTagsDTO,
}), searchController.searchTags.bind(searchController));

export { tags };
