import { Exception, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUserStats } from '@core/domain/entities/QuestionUserStats';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionCreateUseCase } from '../types/usecases';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';

export class QuestionCreateUseCase implements IQuestionCreateUseCase {
  constructor (
    private validateUserUseCase: IValidateUserUseCase,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, data: { title, text, tags } }: QuestionServiceInput.Create,
  ): Promise<QuestionServiceOutput.Create> {
    await this.validateUserUseCase.validate({
      userId: executorId,
    });

    const question = await this.unitOfWork.execute(async (unit) => {
      const question = Question.new({
        ownerId: executorId,
        title,
        text,
      });
      
      await unit.questionRepository.create({
        question,
      });
  
      await unit.questionUserRepository.create({
        user: QuestionUserStats.new({
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
