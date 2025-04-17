import { Exception } from '@cloneoverflow/common';
import { UnitOfWork } from '@core/repositories/UnitOfWork';
import { QuestionCreateInput, QuestionCreateOutput } from './dto';
import { IQuestionCreateUseCase } from './type';

export class QuestionCreateUseCase implements IQuestionCreateUseCase {
  constructor (
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, data: { title, text, tags } }: QuestionCreateInput,
  ): Promise<QuestionCreateOutput> {
    return this.unitOfWork.executeFn(async (unit) => {
      const question = await unit.questionRepository.create({
        ownerId: executorId,
        title,
        text,
      });

      if (tags?.length) {
        const tagEntities = await unit.tagRepository.createOrFindMany({
          names: tags,
        });
        
        await unit.questionRepository.refTags({
          questionId: question.questionId,
          tags: tagEntities,
        });
      }
      return question;
    }).catch(() => {
      throw new Exception('Question creation failed');
    });
  }
}
