import { Answer } from '@core/domain/entities/Answer';
import { AnswerUserStats } from '@core/domain/entities/AnswerUserStats';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerServiceInput } from '../dto/AnswerServiceInput';
import { IAnswerCreateUseCase } from '../types/usecases';
import { AnswerServiceOutput } from '../dto/AnswerServiceOutput';
import { UserAnswerStatusEnum } from '@cloneoverflow/common';

export class AnswerCreateUseCase implements IAnswerCreateUseCase {
  constructor (
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, text }: AnswerServiceInput.Create,
  ): Promise<AnswerServiceOutput.Create> {
    const answer = await this.unitOfWork.execute(async (unit) => {
      const answer = Answer.new({
        ownerId: executorId,
        questionId,
        text,
      });
  
      await unit.answerRepository.create({
        answer,
      });
  
      await unit.answerUserRepository.create({
        user: AnswerUserStats.new({
          userId: executorId,
          answerId: answer.id,
          status: UserAnswerStatusEnum.OWNER,
        }),
      });
  
      return answer;
    });
  
    if (!answer) {
      throw new Error('Answer creation failed');
    }
  
    return answer;
  }
}