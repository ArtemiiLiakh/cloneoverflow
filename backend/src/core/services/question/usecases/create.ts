import { Exception, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionCreateUseCase } from '../types/usecases';

export class QuestionCreateUseCase implements IQuestionCreateUseCase {
  constructor (
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, data: { title, text, tags } }: QuestionServiceInput.Create,
  ): Promise<QuestionServiceOutput.Create> {
    const question = await this.unitOfWork.execute(async (unit) => {
      const question = Question.new({
        ownerId: executorId,
        title,
        text,
      });
      
      await unit.questionRepository.create({ question });
  
      await unit.questionUserRepository.create({
        user: QuestionUser.new({
          userId: executorId,
          questionId: question.id,
          status: QuestionUserStatusEnum.OWNER,
        }),
      });

      if (tags?.length) {
        const tagEntities = await unit.tagRepository.createOrFindMany({ tags });
        await unit.questionRepository.refTags({
          questionId: question.id,
          tags: tagEntities,
        });
      }
  
      return question;
    });
  
    if (!question) {
      throw new Exception('Question create failed');
    }

    return question;    
  }
}
