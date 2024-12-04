import { Exception, ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionUpdateUseCase } from '../types/usecases';

export class QuestionUpdateUseCase implements IQuestionUpdateUseCase {
  constructor (
    private validateUserUseCase: IValidateUserUseCase,
    
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, questionId, data: { text, title, tags } }: QuestionServiceInput.Update,
  ): Promise<QuestionServiceOutput.Update> {
    await this.validateUserUseCase.validate({ userId: executorId });

    const question = await this.questionRepository.findById({ id: questionId });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

    if (question.entity.ownerId !== executorId) {
      throw new ForbiddenException('You are not owner of this question');
    }
  
    const questionUpdate = await this.unitOfWork.execute(async (unit) => {
      if (tags?.length) {
        await unit.questionRepository.unrefAllTags({
          questionId: questionId,
        });
  
        const tagEntities = await unit.tagRepository.createOrFindMany({ tags });
        
        await unit.questionRepository.refTags({
          questionId: questionId,
          tags: tagEntities,
        });
      }
  
      return await unit.questionRepository.update({
        id: questionId,
        question: {
          title,
          text,
        },
        returnEntity: true,
      });
    });
  
    if (!questionUpdate) {
      throw new Exception('Question update failed');
    }
  
    return questionUpdate;
  }
}
