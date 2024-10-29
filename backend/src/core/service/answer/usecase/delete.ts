import { ForbiddenException, NoEntityWithIdException, QuestionStatusEnum } from "@cloneoverflow/common";
import { AnswerRepository } from "@core/domain/repositories/answer/AnswerRepository";
import { UnitOfWork } from "@core/domain/repositories/UnitOfWork";
import { AnswerServiceInput } from "../dto/AnswerServiceInput";
import { AnswerServiceOutput } from "../dto/AnswerServiceOutput";
import { IAnswerDeleteUseCase } from "../types/usecases";

export class AnswerDeleteUseCase implements IAnswerDeleteUseCase {
  constructor (
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute({ answerId, userId }: AnswerServiceInput.Delete): Promise<AnswerServiceOutput.Delete> {
    const answer = await this.answerRepository.findById({ id: answerId });

    if (!answer) {
      throw new NoEntityWithIdException('Answers')
    }
  
    if (answer.entity.ownerId !== userId) {
      throw new ForbiddenException('You cannot delete someone else\'s question');
    }
  
    await this.unitOfWork.execute(async (unit) => {
      if (answer.entity.isSolution) {
        await unit.questionRepository.update({
          id: answer.entity.questionId,
          question: {
            status: QuestionStatusEnum.ACTIVE,
          },
        });
      }
  
      await unit.answerRepository.delete({
        answer: answer.entity,
      });
    });
  
    return answer.entity;
  }
}