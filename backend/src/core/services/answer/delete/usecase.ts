import { Exception, ForbiddenException } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
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
      throw new ForbiddenException('You are not owner of this answer');
    }
  
    await this.unitOfWork.execute(async (unit) => {
      if (answer.isSolution) {
        await unit.questionRepository.openQuestion({
          questionId: answer.questionId,
        });
      }
  
      await unit.answerRepository.delete({ answerId });
    }).catch(() => {
      throw new Exception('Answer deleting failed');
    });
  
    return answer;
  }
}