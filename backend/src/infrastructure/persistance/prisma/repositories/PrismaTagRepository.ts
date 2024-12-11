import { TagRepositoryInput } from '@core/domain/repositories/tag/dtos/TagRepositoryInput';
import { TagsRepositoryOutput } from '@core/domain/repositories/tag/dtos/TagRepositoryOutput';
import { TagRepository } from '@core/domain/repositories/tag/TagRepository';
import { PrismaClient } from '@prisma/client';
import { TagCountsAdapter } from '../adapters/counts/TagCountsAdapter';
import { TagMapper } from '../adapters/entityMappers/TagMapper';
import { TagOrderByAdapter } from '../adapters/orderBy/TagsOrderByAdapter';
import { TagWhereAdapter } from '../adapters/where/tag/TagWhereAdapter';
import { PrismaPaginationRepository } from './PrismaPagination';

export class PrismaTagRepository implements TagRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}

  async isExist (
    { tagId, name }: TagRepositoryInput.IsExist,
  ): Promise<TagsRepositoryOutput.IsExist> {
    const tag = await this.prisma.tag.findFirst({
      where: {
        id: tagId,
        name,
      },
      select: { id: true },
    });

    return !!tag;
  }

  async getTag (
    { where, counts, orderBy }: TagRepositoryInput.GetTag,
  ): Promise<TagsRepositoryOutput.GetTag> {
    const tag = await this.prisma.tag.findFirst({
      where: TagWhereAdapter(where),
      include: TagCountsAdapter(counts),
      orderBy: TagOrderByAdapter(orderBy),
    });

    if (!tag) return null;

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
        include: TagCountsAdapter(counts),
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
    { tag }: TagRepositoryInput.Create,
  ): Promise<TagsRepositoryOutput.Create> {
    await this.prisma.tag.create({
      data: {
        id: tag.id,
        name: tag.name,
      },
    });
  }
  
  async createMany (
    { tags }: TagRepositoryInput.CreateMany,
  ): Promise<TagsRepositoryOutput.CreateMany> {
    await this.prisma.tag.createMany({
      data: tags.map(tag => ({
        id: tag.id,
        name: tag.name,
      })),
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

    return this.prisma.tag.findMany({
      where: {
        name: { in: tags },
      },
    });
  }
  
  async update (
    { tagId, name, returnEntity }: TagRepositoryInput.Update,
  ): Promise<TagsRepositoryOutput.Update> {
    const tag = await this.prisma.tag.update({
      where: { id: tagId },
      data: { name },
    });

    if (returnEntity) return tag;
  }
  
  async delete (
    { tagId }: TagRepositoryInput.Delete,
  ): Promise<TagsRepositoryOutput.Delete> {
    await this.prisma.tag.delete({ where: { id: tagId } });
  }
}