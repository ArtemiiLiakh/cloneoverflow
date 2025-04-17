import { PrismaRepositoryDITokens } from '@application/http-rest/nestjs/di/tokens/persistence';
import { Tag } from '@core/models/tag/Tag';
import { QuestionRepository, TagRepository, UnitOfWork } from '@core/repositories';
import { INestApplication } from '@nestjs/common';
import { randomBytes } from 'crypto';

export class TagUtils {
  private tagRepository: TagRepository;
  private questionRepository: QuestionRepository;
  private unitOfWork: UnitOfWork;
  
  constructor (
    nest: INestApplication,
  ) {
    this.tagRepository = nest.get(PrismaRepositoryDITokens.TagRepository);
    this.questionRepository = nest.get(PrismaRepositoryDITokens.QuestionRepository);
    this.unitOfWork = nest.get(PrismaRepositoryDITokens.UnitOfWork);
  }

  async create (
    payload?: { name?: string, questionId?: string },
  ): Promise<Tag> {
    return this.unitOfWork.executeFn(async (unit) => {
      const tag = (await unit.tagRepository.createOrFindMany({ 
        names: [payload?.name ?? randomBytes(4).toString('hex')],
      }))[0];
      
      if (payload?.questionId) {
        await unit.questionRepository.refTags({
          questionId: payload.questionId,
          tags: [tag],
        });
      }
      
      return tag;
    });
  }

  getTag (name: string): Promise<Tag> {
    return this.tagRepository.getByName({ name });
  }

  getByQuestion (questionId: string): Promise<Tag[]> {
    return this.tagRepository.getQuestionTags({
      questionId,
    });
  }

  delete (name: string): Promise<void> {
    return this.tagRepository.delete({ name });
  }
}