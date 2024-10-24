import { OrderBy, SearchTagsSortByEnum } from "@cloneoverflow/common";
import { TagRepositoryInput } from "@core/domain/repositories/tag/input/TagRepositoryInput";

export const getTagsSortBy = (sortBy?: SearchTagsSortByEnum, orderBy?: OrderBy): TagRepositoryInput.TagOrderBy => {
  switch (sortBy) {
    case SearchTagsSortByEnum.NAME:
      return {
        text: orderBy ?? OrderBy.ASC,
      };
    case SearchTagsSortByEnum.NEWEST:
      return {
        createdAt: orderBy ?? OrderBy.DESC,
      };
    case SearchTagsSortByEnum.POPULAR:
      return {
        questions: orderBy ?? OrderBy.DESC,
      };
  }

  return {
    questions: orderBy ?? OrderBy.DESC,
  };
}