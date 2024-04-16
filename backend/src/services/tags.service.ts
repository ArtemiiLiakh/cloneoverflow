import { OrderBy, SearchTagsDTO, SearchTagsSortBy } from "@cloneoverflow/common";
import { TagsRepository } from "../repositories/tags.repository";
import { DbUtils } from "../utils/DatabaseUtils";
import { Prisma } from "@prisma/client";
import { DbTag } from "../types/database/DbTag";

export class TagsService {
  constructor (
    private tagsRepository = new TagsRepository(),
  ) {}

  async getAll ({ name, sortBy, orderBy, pagination }: SearchTagsDTO) {
    const data = await DbUtils.paginate<Prisma.TagFindManyArgs, DbTag>(this.tagsRepository, {
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      orderBy: this.getTagsSortBy(sortBy, orderBy),
    }, pagination);
    return data;
  }

  private getTagsSortBy (sortBy?: SearchTagsSortBy, orderBy?: OrderBy): Prisma.TagOrderByWithRelationInput {
    switch (sortBy) {
      case SearchTagsSortBy.NAME:
        return {
          name: orderBy ?? OrderBy.ASC,
        };
      case SearchTagsSortBy.NEWEST:
        return {
          createdAt: orderBy ?? OrderBy.DESC,
        };
      case SearchTagsSortBy.POPULAR:
        return {
          questions: {
            _count: orderBy ?? OrderBy.DESC,
          }
        };
    }

    return {
      questions: {
        _count: OrderBy.DESC,
      },
    };
  }
}