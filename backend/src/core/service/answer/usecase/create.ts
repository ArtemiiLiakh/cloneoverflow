import { Answer } from '@core/domain/entities/Answer';
import { AnswerUserStats } from '@core/domain/entities/AnswerUserStats';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { AnswerServiceInput } from '../dto/AnswerServiceInput';
import { IAnswerCreateUseCase } from '../types/usecases';
import { AnswerServiceOutput } from '../dto/AnswerServiceOutput';
import { AnswerUserStatusEnum, NoEntityWithIdException } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';

export class AnswerCreateUseCase implements IAnswerCreateUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, text }: AnswerServiceInput.Create,
  ): Promise<AnswerServiceOutput.Create> {
    const question = await this.questionRepository.findById({
      id: questionId,
    });

    if (!question) {
      throw new NoEntityWithIdException('Question');
    }

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