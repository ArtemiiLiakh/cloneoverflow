import { NoEntityWithIdException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionUserStats } from '@core/domain/entities/QuestionUserStats';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionAddViewerUseCase } from '../types/usecases';

export class QuestionAddViewerUseCase implements IQuestionAddViewerUseCase {
  constructor (
    private validateUserUseCase: IValidateUserUseCase,
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, questionId }: QuestionServiceInput.AddViewer,
  ): Promise<QuestionServiceOutput.AddViewer> {
    await this.validateUserUseCase.validate({
      userId: executorId,
    });

    const question = await this.questionRepository.findById({ 
      id: questionId,
      options: {
        include: {
          users: {
            questionId,
            userId: executorId,
            status: QuestionUserStatusEnum.VIEWER,
          },
        },
      },
    });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

    if (!question.users?.at(0)) {
      const questionUser = QuestionUserStats.new({
        userId: executorId,
        questionId,
        status: QuestionUserStatusEnum.VIEWER,
      });

      await this.unitOfWork.execute(async (unit) => {
        await unit.questionRepository.update({
          id: questionId,
          question: {
            views: question.entity.views + 1,
          },
        });

        await unit.questionUserRepository.create({ user: questionUser });
      });

      return questionUser;
    }

    return question.users.at(0)!;
  }
}