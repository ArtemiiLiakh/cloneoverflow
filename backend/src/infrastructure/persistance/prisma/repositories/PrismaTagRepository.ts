import { NoEntityWithIdException } from '@cloneoverflow/common';
import { TagRepositoryInput } from '@core/domain/repositories/tag/dtos/TagRepositoryInput';
import { TagsRepositoryOutput } from '@core/domain/repositories/tag/dtos/TagRepositoryOutput';
import { TagRepository } from '@core/domain/repositories/tag/TagRepository';
import { PrismaClient } from '@prisma/client';
import { TagCountsAdapter } from '../adapters/counts/TagCountsAdapter';
import { TagMapper } from '../adapters/entityMappers/TagMapper';
import { TagOrderByAdapter } from '../adapters/orderBy/TagsOrderByAdapter';
import { TagWhereAdapter } from '../adapters/where/tag/TagWhereAdapter';
import { PrismaPaginationRepository } from './PrismaPaginationRepository';

export class PrismaTagRepository implements TagRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async isExist (where: TagRepositoryInput.IsExist): Promise<TagsRepositoryOutput.IsExist> {
    const tag = await this.prisma.tag.findFirst({
      where: TagWhereAdapter(where),
      select: { id: true },
    });

    return !!tag;
  }

  async getTag (
    { where, counts, orderBy }: TagRepositoryInput.GetTag,
  ): Promise<TagsRepositoryOutput.GetTag> {
    const tag = await this.prisma.tag.findFirst({
      where: TagWhereAdapter(where),
      include: TagCountsAdapter(counts, where),
      orderBy: TagOrderByAdapter(orderBy),
    });

    if (!tag) throw new NoEntityWithIdException('Tag');

    return TagMapper.toEntity(tag); 
  }
  
  async getMany (
    { where, counts, orderBy, pagination }: TagRepositoryInput.GetMany,
  ): Promise<TagsRepositoryOutput.GetMany> {
    const tags = await PrismaPaginationRepository.paginate(
      this.prisma.tag.findMany.bind(this.prisma),
      this.prisma.tag.count.bind(this.prisma),
      {
        where: TagWhereAdapter(where),
        include: TagCountsAdapter(counts, where),
        orderBy: TagOrderByAdapter(orderBy),
      },
      pagination,
    );

    return {
      data: tags.data.map((tag) => ({
        entity: TagMapper.toEntity(tag),
        counts: tag._count ? {
          questions: tag._count.questions,
        } : undefined,
      })),
      pagination: tags.pagination,
    };
  }
  
  async create (
    { tag, returnId: returnId }: TagRepositoryInput.Create,
  ): Promise<TagsRepositoryOutput.Create> {
    const tagId = await this.prisma.tag.create({
      data: { name: tag.name },
      select: returnId ? { id: true } : undefined,
    });

    if (returnId) return tagId.id.toString();
  }
  
  async createMany (
    { tags }: TagRepositoryInput.CreateMany,
  ): Promise<TagsRepositoryOutput.CreateMany> {
    await this.prisma.tag.createMany({
      data: tags.map(tag => ({ name: tag.name })),
      skipDuplicates: true,
    });
  }
  
  async createOrFindMany (
    { tags }: TagRepositoryInput.CreateOrFindMany,
  ): Promise<TagsRepositoryOutput.CreateOrFindMany> {
    await this.prisma.tag.createMany({
      data: tags.map(name => ({ name })),
      skipDuplicates: true,
    });

    const taglist = await this.prisma.tag.findMany({
      where: {
        name: { in: tags },
      },
    });

    return taglist.map(TagMapper.toEntity);
  }
  
  async update (
    { tagId, name, returnEntity }: TagRepositoryInput.Update,
  ): Promise<TagsRepositoryOutput.Update> {
    const tag = await this.prisma.tag.update({
      where: { id: +tagId },
      data: { name },
    });

    if (returnEntity) return TagMapper.toEntity(tag);
  }
  
  async delete (
    { tagId, name }: TagRepositoryInput.Delete,
  ): Promise<TagsRepositoryOutput.Delete> {
    await this.prisma.tag.delete({ 
      where: { 
        id: tagId ? +tagId : undefined,
        name,
      }, 
    });
  }
}