import { SearchTagsResponse } from '@cloneoverflow/common/api/search';
import { SerachTagsOutput } from '../usecases/dtos';

export function SearchTagsMapperOutput ({
  data,
  pagination,
}: SerachTagsOutput): SearchTagsResponse {
  return {
    tags: data.map(({ tag, questionAmount }) => ({
      id: tag.id,
      name: tag.name,
      questionsAmount: questionAmount,
    })),
    pagination,
  };
}