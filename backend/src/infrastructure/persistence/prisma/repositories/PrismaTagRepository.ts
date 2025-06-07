import { TagNotFound } from '@core/tag/exceptions/TagNotFound';
import { TagRepoCreateOrFindManyInput, TagRepoCreateOrFindManyOutput } from '@core/tag/repository/dtos/CreateOrFindMany';
import { TagRepoDeleteInput, TagRepoDeleteOutput } from '@core/tag/repository/dtos/Delete';
import { TagRepoGetByNameInput, TagRepoGetByNameOuput } from '@core/tag/repository/dtos/GetByName';
import { TagRepoGetQuestionTagsInput, TagRepoGetQuestionTagsOutput } from '@core/tag/repository/dtos/GetQuestionTags';
import { TagRepoIsExistInput, TagRepoIsExistOutput } from '@core/tag/repository/dtos/IsExist';
import { TagRepoSearchInput, TagRepoSearchOutput } from '@core/tag/repository/dtos/Search';
import { TagRepository } from '@core/tag/repository/TagRepository';
import { PrismaClient } from '@prisma/client';
import { TagMapper } from '../adapters/entityMappers/TagMapper';
import { PrismaPaginationRepository } from './PrismaPaginationRepository';

export class PrismaTagRepository implements TagRepository {
  constructor (
    private client: PrismaClient,
  ) {}

  async getByName (
    { name }: TagRepoGetByNameInput,
  ): Promise<TagRepoGetByNameOuput> {
    const tag = await this.client.tag.findFirst({
      where: {
        name,
      },
    });

    if (!tag) {
      throw new TagNotFound();
    }

    return TagMapper.toEntity(tag);
  }

  async getQuestionTags (
    { questionId }: TagRepoGetQuestionTagsInput,
  ): Promise<TagRepoGetQuestionTagsOutput> {
    const tags = await this.client.tag.findMany({
      where: {
        questions: {
          some: {
            id: +questionId,
          },
        },
      },
    });

    return tags.map(TagMapper.toEntity);
  }

  async isExist (
    { tagId, name }: TagRepoIsExistInput,
  ): Promise<TagRepoIsExistOutput> {
    const res = await this.client.tag.findFirst({
      where: {
        id: tagId ? +tagId : undefined,
        name,
      },
      select: {
        id: true,
      },
    });

    return !!res;
  }

  async search (
    { where, orderBy, pagination }: TagRepoSearchInput,
  ): Promise<TagRepoSearchOutput> {
    const tags = await PrismaPaginationRepository.paginate(
      this.client.tag.findMany.bind(this.client),
      this.client.tag.count.bind(this.client),
      {
        where: {
          name: {
            contains: where.searchText,
          },
        },
        include: {
          _count: {
            select: {
              questions: true,
            },
          },
        },
        orderBy: {
          name: orderBy?.name,
          questions: orderBy?.popular ? {
            _count: orderBy?.popular,
          } : undefined,
        },
      },
      pagination,
    );

    return {
      data: tags.data.map((tag) => ({
        tag: TagMapper.toEntity(tag),
        questionAmount: tag._count.questions,
      })),
      pagination: tags.pagination,
    };
  }
  
  async createOrFindMany (
    { names }: TagRepoCreateOrFindManyInput,
  ): Promise<TagRepoCreateOrFindManyOutput> {
    const existingTags = await this.client.tag.findMany({
      where: {
        name: {
          in: names,
        },
      },
    });

    const newNames = names.filter(
      (name) => existingTags.findIndex(
        (tag) => tag.name === name,
      ) === -1,
    );

    const newTags = await this.client.tag.createManyAndReturn({
      data: newNames.map((name) => ({ name })),
    });

    return [...existingTags, ...newTags].map(TagMapper.toEntity);
  }

  async delete (
    { tagId, name }: TagRepoDeleteInput,
  ): Promise<TagRepoDeleteOutput> {
    await this.client.tag.delete({
      where: {
        id: tagId ? +tagId : undefined,
        name,
      },
    });
  }
}