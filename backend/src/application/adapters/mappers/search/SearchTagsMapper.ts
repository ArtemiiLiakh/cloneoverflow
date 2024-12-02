import { SearchTagsReponse } from '@cloneoverflow/common';
import { SearchServiceOutput } from '@core/service/search/dto/SearchServiceOutput';

export function SearchTagsMapperOutput ({
  data,
  pagination,
}: SearchServiceOutput.SerachTags): SearchTagsReponse {
  return {
    tags: data.map(({ entity, questionsAmount }) => ({
      id: entity.id,
      name: entity.text,
      createdAt: entity.createdAt,
      questionsAmount,
    })),
    pagination,
  };
}