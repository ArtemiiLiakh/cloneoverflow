import { SearchTagsReponse } from "@cloneoverflow/common";
import { SearchServiceOutput } from "@core/service/search/dto/SearchServiceOutput";

export function SearchTagsMapperOutput ({
  data,
  pagination
}: SearchServiceOutput.SerachTags): SearchTagsReponse {
  return {
    tags: data.map(({ tag, questionsAmount }) => ({
      id: tag.id,
      name: tag.text,
      createdAt: tag.createdAt,
      questionsAmount,
    })),
    pagination,
  };
}