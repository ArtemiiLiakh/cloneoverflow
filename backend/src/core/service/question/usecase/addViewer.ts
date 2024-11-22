import { UserQuestionStatusEnum } from '@cloneoverflow/common';
import { QuestionUserStats } from '@core/domain/entities/QuestionUserStats';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionServiceInput } from '../dto/QuestionServiceInput';
import { QuestionServiceOutput } from '../dto/QuestionServiceOutput';
import { IQuestionAddViewerUseCase } from '../types/usecases';

export class QuestionAddViewerUseCase implements IQuestionAddViewerUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute (
    { executorId, questionId }: QuestionServiceInput.AddViewer,
  ): Promise<QuestionServiceOutput.AddViewer> {
    const question = await this.questionRepository.findById({ 
      id: questionId,
      options: {
        include: {
          users: {
            questionId,
            userId: executorId,
            status: UserQuestionStatusEnum.VIEWER,
          },
        },
      },
    });

    const questionUser = QuestionUserStats.new({
      userId: executorId,
      questionId,
      status: UserQuestionStatusEnum.VIEWER,
    });

    if (question && !question.users?.at(0)) {
      await this.unitOfWork.execute(async (unit) => {
        await unit.questionRepository.update({
          id: questionId,
          question: {
            views: question.entity.views + 1,
          },
        });

        await unit.questionUserRepository.create({ user: questionUser });
      });
    }

    return questionUser;
  }
}