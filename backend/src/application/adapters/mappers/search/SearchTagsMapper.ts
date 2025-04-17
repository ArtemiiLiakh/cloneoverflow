import { SearchTagsReponse } from '@cloneoverflow/common';
import { SerachTagsOutput } from '@core/services/search/dtos';

export function SearchTagsMapperOutput ({
  data,
  pagination,
}: SerachTagsOutput): SearchTagsReponse {
  return {
    tags: data.map(({ tag, questionAmount }) => ({
      id: tag.id,
      name: tag.name,
      questionsAmount: questionAmount,
    })),
    pagination,
  };
}