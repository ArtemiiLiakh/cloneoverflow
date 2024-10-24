import { NoEntityWithIdException } from "@cloneoverflow/common";
import { UserQuestionStatusEnum } from "@common/enums/UserQuestionStatus";
import { QuestionUserStats } from "@core/domain/entities/QuestionUserStats";
import { QuestionRepository } from "@core/domain/repositories/question/QuestionRepository";
import { UnitOfWork } from "@core/domain/repositories/UnitOfWork";
import { QuestionServiceInput } from "../dto/QuestionServiceInput";
import { QuestionServiceOutput } from "../dto/QuestionServiceOutput";
import { IQuestionGetUseCase } from "../types/usecases";

export class QuestionGetUseCase implements IQuestionGetUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute({ userId, questionId }: QuestionServiceInput.Get): Promise<QuestionServiceOutput.Get> {
    const question = await this.questionRepository.findById({
      id: questionId,
      options: {
        include: {
          users: {
            userId,
            questionId,
            status: { in: [UserQuestionStatusEnum.VIEWER, UserQuestionStatusEnum.VOTER] },
          },
          answers: true,
          owner: true,
          tags: true,
        },
      }
    });
  
    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  
    if (userId) {
      const questionViewer = question.users!.find(user => user.status === UserQuestionStatusEnum.VIEWER);
  
      if (!questionViewer) {
        await this.unitOfWork.execute(async (unit) => {
          await unit.questionRepository.update({
            id: questionId,
            question: {
              views: question.entity.views + 1,
            }
          });
  
          const questionUser = QuestionUserStats.new({
            userId,
            questionId,
            status: UserQuestionStatusEnum.VIEWER
          });
  
          await unit.questionUserRepository.create({ user: questionUser });
        });
      }
    }
  
    return {
      question: question.entity, 
      owner: question.owner!,
      answers: question.answers!,
      tags: question.tags!,
      user: question.users?.[0],
    };
  }
}