import { BadBodyException, Exception, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { UnitOfWork } from '@core/domain/repositories';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionOpenInput, QuestionOpenOutput } from './dto';
import { IQuestionOpenUseCase } from './type';

export class QuestionOpenUseCase implements IQuestionOpenUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId }: QuestionOpenInput,
  ): Promise<QuestionOpenOutput> {
    const question = await this.questionRepository.getPartialById({ 
      questionId,
      select: {
        isClosed: true,
      },
    });

    if (!question.isClosed) {
      throw new BadBodyException('The question is already opened');
    }

    const result = await this.unitOfWork.execute(async (unit) => {
      const questionAnswerer = await unit.questionUserRepository.getOne({
        where: {
          questionId,
          userId: executorId,
          status: QuestionUserStatusEnum.ANSWERER,
        },
      });

      if (questionAnswerer) {
        await unit.questionUserRepository.delete({
          questionUserId: questionAnswerer.id,
        });
      }

      await unit.questionRepository.openQuestion({ questionId });
      return true;
    });

    if (!result) {
      throw new Exception('Question opening failed');
    }
  }
}