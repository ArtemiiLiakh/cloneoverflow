import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { Tag } from '@core/models/Tag';
import { TagRepository, UnitOfWork } from '@core/repositories';
import { INestApplication } from '@nestjs/common';
import { randomUUID } from 'crypto';

export class TagUtils {
  private tagRepository: TagRepository;
  private unitOfWork: UnitOfWork;
  
  constructor (
    nest: INestApplication,
  ) {
    this.tagRepository = nest.get(PrismaRepositoryDITokens.TagRepository);
    this.unitOfWork = nest.get(PrismaRepositoryDITokens.UnitOfWork);
  }

  async create (
    payload?: { name?: string, questionId?: string },
  ): Promise<Tag> {
    const newTag = Tag.new({
      name: payload?.name ?? randomUUID(),
    });

    await this.unitOfWork.execute(async (unit) => {
      newTag.id = await unit.tagRepository.create({ tag: newTag, returnId: true }).then(id => id!);

      if (payload?.questionId) {
        await unit.questionRepository.refTags({
          questionId: payload.questionId,
          tags: [newTag],
        });
      }
    });

    return newTag;
  }

  getTag (name: string): Promise<Tag> {
    return this.tagRepository.getTag({ where: { name: name } });
  }

  getByQuestion (questionId: string): Promise<Tag[]> {
    return this.tagRepository.getMany({
      where: {
        questions: {
          questionId,
        },
      },
    }).then(tags => {
      return tags.data.map(tag => Tag.new({
        id: tag.entity.id!,
        name: tag.entity.name!,
      }));
    });
  }

  async delete (name: string) {
    await this.tagRepository.delete({ name });
  }
}