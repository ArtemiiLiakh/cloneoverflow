import { SearchTagsReponse } from '@cloneoverflow/common';
import { SearchServiceOutput } from '@core/services/search/dtos/SearchServiceOutput';

export function SearchTagsMapperOutput ({
  data,
  pagination,
}: SearchServiceOutput.SerachTags): SearchTagsReponse {
  return {
    tags: data.map(({ entity, questionsAmount }) => ({
      id: entity.id,
      name: entity.name,
      questionsAmount,
    })),
    pagination,
  };
}