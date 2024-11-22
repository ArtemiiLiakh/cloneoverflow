import { Exception, UserQuestionStatusEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUserStats } from '@core/domain/entities/QuestionUserStats';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionServiceInput } from '../dto/QuestionServiceInput';
import { QuestionServiceOutput } from '../dto/QuestionServiceOutput';
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
        text,
        title,
      });
      
      await unit.questionRepository.create({
        question,
      });
  
      await unit.questionUserRepository.create({
        user: QuestionUserStats.new({
          userId: executorId,
          questionId: question.id,
          status: UserQuestionStatusEnum.OWNER,
        }),
      });
  
      if (tags.length) {
        const tagEntities = await unit.tagRepository.createOrFindMany({ tags });
        await unit.questionRepository.refTags({
          id: question.id,
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
