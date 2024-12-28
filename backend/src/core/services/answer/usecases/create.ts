import { AnswerUserStatusEnum } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerCreateUseCase } from '../types/usecases';
import { IValidateQuestionUseCase } from '@core/services/validation/types/usecases';

export class AnswerCreateUseCase implements IAnswerCreateUseCase {
  constructor (
    private validateQuestionUseCase: IValidateQuestionUseCase,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, text }: AnswerServiceInput.Create,
  ): Promise<AnswerServiceOutput.Create> {
    await this.validateQuestionUseCase.execute({ questionId });

    const answer = await this.unitOfWork.execute(async (unit) => {
      const answer = Answer.new({
        ownerId: executorId,
        questionId,
        text,
      });
  
      await unit.answerRepository.create({ answer });
  
      await unit.answerUserRepository.create({
        user: AnswerUser.new({
          userId: executorId,
          answerId: answer.id,
          status: AnswerUserStatusEnum.OWNER,
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