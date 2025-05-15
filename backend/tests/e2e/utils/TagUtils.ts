import { Tag } from '@core/domain/entities/Tag';
import { TagRepository, UnitOfWork } from '@core/domain/repositories';
import { randomUUID } from 'crypto';

export class TagUtils {
  constructor (
    private tagRepository: TagRepository,
    private unitOfWork: UnitOfWork,
  ) {}

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