import { BadBodyException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionOpenUseCase } from '../types/usecases';

export class QuestionOpenUseCase implements IQuestionOpenUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId }: QuestionServiceInput.OpenQuestion,
  ): Promise<QuestionServiceOutput.OpenQuestion> {
    const question = await this.questionRepository.getPartialById({ 
      questionId,
      select: {
        isClosed: true,
      },
    });

    if (!question.isClosed) {
      throw new BadBodyException('The question is already opened');
    }

    await this.unitOfWork.execute(async (unit) => {
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
    });
  }
}