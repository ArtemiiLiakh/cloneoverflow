import { AnswerUserStatusEnum, Exception } from '@cloneoverflow/common';
import { Answer } from '@core/domain/entities/Answer';
import { AnswerUser } from '@core/domain/entities/AnswerUser';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerServiceInput } from '../dtos/AnswerServiceInput';
import { AnswerServiceOutput } from '../dtos/AnswerServiceOutput';
import { IAnswerCreateUseCase } from '../types/usecases';

export class AnswerCreateUseCase implements IAnswerCreateUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, text }: AnswerServiceInput.Create,
  ): Promise<AnswerServiceOutput.Create> {
    await this.questionRepository.validateById({ questionId });

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
      throw new Exception('Answer creation failed');
    }
  
    return answer;
  }
}