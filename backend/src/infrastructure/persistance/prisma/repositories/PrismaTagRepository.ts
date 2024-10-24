import { TagsRepositoryOutput } from "@core/domain/repositories/tag/output/TagRepositoryOutput";
import { TagRepositoryInput } from "@core/domain/repositories/tag/input/TagRepositoryInput";
import { TagRepository } from "@core/domain/repositories/tag/TagRepository";
import { TagIncludeAdatper } from "@infra/persistance/prisma/adapters/include/TagIncludeAdapter";
import { TagOrderByAdapter } from "@infra/persistance/prisma/adapters/orderBy/TagsOrderByAdapter";
import { TagRepositoryMapper } from "@infra/persistance/prisma/adapters/repositories/TagRepositoryMapper";
import { TagWhereAdapter } from "@infra/persistance/prisma/adapters/where/tag/TagWhereAdapter";
import { PrismaClient } from "@prisma/client";
import { PrismaPaginationRepository } from "./PrismaPaginationRepository";

export class PrismaTagRepository implements TagRepository {
  constructor (
    private prisma: PrismaClient,
  ) {}
  
  async findOne({ where, options }: TagRepositoryInput.FindOne): Promise<TagsRepositoryOutput.FindOne> {
    const tag = await this.prisma.tag.findFirst({
      where: TagWhereAdapter(where),
      include: TagIncludeAdatper(options?.include, options?.count),
      orderBy: TagOrderByAdapter(options?.orderBy),
    });

    if (!tag) return null;

    return TagRepositoryMapper.findOne(tag);
  }

  findById({ id, options }: TagRepositoryInput.FindById): Promise<TagsRepositoryOutput.FindById> {
    return this.findOne({
      where: {
        id: id,
      },
      options,
    });
  }

  async findMany({ where, options }: TagRepositoryInput.FindMany): Promise<TagsRepositoryOutput.FindMany> {
    const tags = await this.prisma.tag.findMany({
      where: TagWhereAdapter(where),
      include: TagIncludeAdatper(options?.include, options?.count),
      orderBy: TagOrderByAdapter(options?.orderBy),
      skip: options?.offset,
      take: options?.take,
    });

    return TagRepositoryMapper.findMany(tags);
  }

  async create({ tag }: TagRepositoryInput.Create): Promise<TagsRepositoryOutput.Create> {
    await this.prisma.tag.create({
      data: {
        id: tag.id,
        name: tag.text,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
      },
    });
  }

  count({ where }: TagRepositoryInput.Count): Promise<TagsRepositoryOutput.Count> {
    return this.prisma.tag.count({
      where: TagWhereAdapter(where),
    });
  }

  async paginate({ where, options, pagination }: TagRepositoryInput.Paginate): Promise<TagsRepositoryOutput.Paginate> {
    const tags = await PrismaPaginationRepository.paginate(this.prisma.tag, {
      where: TagWhereAdapter(where),
      include: TagIncludeAdatper(options?.include, options?.count),
      orderBy: TagOrderByAdapter(options?.orderBy),
      skip: options?.offset,
      take: options?.take,
    }, pagination);

    return TagRepositoryMapper.paginate(tags);
  }

  async createMany({ tags }: TagRepositoryInput.CreateMany): Promise<TagsRepositoryOutput.CreateMany> {
    await this.prisma.tag.createMany({
      data: tags.map(tag => ({
        id: tag.id,
        name: tag.text,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
      })),
    });
  }

  async createOrFindMany({ tags }: TagRepositoryInput.CreateOrFindMany): Promise<TagsRepositoryOutput.CreateOrFindMany> {
    await this.prisma.tag.createMany({
      data: tags.map(tag => ({
        name: tag,
      })),

      skipDuplicates: true,
    });

    const existingTags = await this.prisma.tag.findMany({
      where: {
        name: {
          in: tags,
        },
      },
    });

    return TagRepositoryMapper.createOrFindMany(existingTags);
  }

  async update({ id, tag }: TagRepositoryInput.Update): Promise<TagsRepositoryOutput.Update> {
    const updatedTag = await this.prisma.tag.update({
      where: {
        id,
      },
      data: {
        name: tag.text,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
      },
    });

    return TagRepositoryMapper.update(updatedTag);
  }

  async delete({ tag }: TagRepositoryInput.Delete): Promise<TagsRepositoryOutput.Delete> {
    await this.prisma.tag.delete({
      where: {
        id: tag.id,
      },
    });
  }

  async deleteMany({ where }: TagRepositoryInput.DeleteMany): Promise<TagsRepositoryOutput.DeleteMany> {
    await this.prisma.tag.deleteMany({
      where: TagWhereAdapter(where),
    });
  }
}