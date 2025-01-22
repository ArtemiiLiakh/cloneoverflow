import { Exception, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { Question } from '@core/domain/entities/Question';
import { QuestionUser } from '@core/domain/entities/QuestionUser';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionCreateInput, QuestionCreateOutput } from './dto';
import { IQuestionCreateUseCase } from './type';

export class QuestionCreateUseCase implements IQuestionCreateUseCase {
  constructor (
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, data: { title, text, tags } }: QuestionCreateInput,
  ): Promise<QuestionCreateOutput> {
    const question = await this.unitOfWork.execute(async (unit) => {
      const question = Question.new({
        ownerId: executorId,
        title,
        text,
      });
      
      question.id = await unit.questionRepository.create({ 
        question, 
        returnId: true,
      }).then(id => id!);
  
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
    }).catch(() => {
      throw new Exception('Question creation failed');
    });
  
    return question;    
  }
}
