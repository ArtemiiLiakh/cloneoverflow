import { ServerError } from '@cloneoverflow/common';
import { AnswerOwnerInvalid } from '@core/answer/exceptions/AnswerOwnerInvalid';
import { AnswerRepository } from '@core/answer/repository/AnswerRepository';
import { UnitOfWork } from '@common/repository/UnitOfWork';
import { AnswerDeleteInput, AnswerDeleteOutput } from './dto';
import { IAnswerDeleteUseCase } from './type';

export class AnswerDeleteUseCase implements IAnswerDeleteUseCase {
  constructor (
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, answerId }: AnswerDeleteInput,
  ): Promise<AnswerDeleteOutput> {
    const answer = await this.answerRepository.getById({ answerId });
  
    if (answer.ownerId !== executorId) {
      throw new AnswerOwnerInvalid();
    }
  
    await this.unitOfWork.executeFn(async (unit) => {
      if (answer.isSolution) {
        await unit.questionRepository.openQuestion({
          questionId: answer.questionId,
        });
      }
  
      await unit.answerRepository.delete({ answerId });
    }).catch(() => {
      throw new ServerError('Answer deleting failed');
    });
  
    return answer;
  }
}