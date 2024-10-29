import { SearchTagsSortByEnum, OrderByEnum } from "@cloneoverflow/common";
import { TagRepositoryInput } from "@core/domain/repositories/tag/input/TagRepositoryInput";

export const TagsSortBy = (sortBy?: SearchTagsSortByEnum, orderBy?: OrderByEnum): TagRepositoryInput.TagOrderBy => {
  switch (sortBy) {
    case SearchTagsSortByEnum.NAME:
      return {
        text: orderBy ?? OrderByEnum.ASC,
      };
    case SearchTagsSortByEnum.NEWEST:
      return {
        createdAt: orderBy ?? OrderByEnum.DESC,
      };
    case SearchTagsSortByEnum.POPULAR:
      return {
        questions: orderBy ?? OrderByEnum.DESC,
      };
  }

  return {
    questions: orderBy ?? OrderByEnum.DESC,
  };
}