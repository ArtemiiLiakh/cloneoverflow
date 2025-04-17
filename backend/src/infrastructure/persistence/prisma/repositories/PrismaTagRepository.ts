import { NotFoundException } from '@cloneoverflow/common';
import { TagRepoCreateOrFindManyInput, TagRepoCreateOrFindManyOutput } from '@core/repositories/tag/dtos/CreateOrFindMany';
import { TagRepoDeleteInput, TagRepoDeleteOutput } from '@core/repositories/tag/dtos/Delete';
import { TagRepoGetByNameInput, TagRepoGetByNameOuput } from '@core/repositories/tag/dtos/GetByName';
import { TagRepoGetQuestionTagsInput, TagRepoGetQuestionTagsOutput } from '@core/repositories/tag/dtos/GetQuestionTags';
import { TagRepoIsExistInput, TagRepoIsExistOutput } from '@core/repositories/tag/dtos/IsExist';
import { TagRepoSearchInput, TagRepoSearchOutput } from '@core/repositories/tag/dtos/Search';
import { TagRepository } from '@core/repositories/tag/TagRepository';
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
      throw new NotFoundException('Tag with this name is not found');
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
    if (!tagId && !name) {
      throw new Error('Tag id or name is required');
    }
    
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