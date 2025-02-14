import { SearchTagsReponse } from '@cloneoverflow/common';
import { SerachTagsOutput } from '@core/services/search/dtos';

export function SearchTagsMapperOutput ({
  data,
  pagination,
}: SerachTagsOutput): SearchTagsReponse {
  return {
    tags: data.map(({ entity, questionsAmount }) => ({
      id: entity.id,
      name: entity.name,
      questionsAmount,
    })),
    pagination,
  };
}