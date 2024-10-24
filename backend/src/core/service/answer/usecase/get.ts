import { NoEntityWithIdException } from "@cloneoverflow/common";
import { UserAnswerStatusEnum } from "@common/enums/UserAnswerStatus";
import { AnswerRepository } from "@core/domain/repositories/answer/AnswerRepository";
import { AnswerServiceInput } from "../dto/AnswerServiceInput";
import { AnswerServiceOutput } from "../dto/AnswerServiceOutput";
import { IAnswerGetUseCase } from "../types/usecases";

export class AnswerGetUseCase implements IAnswerGetUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async execute({ userId, answerId }: AnswerServiceInput.Get): Promise<AnswerServiceOutput.Get> {
    const answer =  await this.answerRepository.findById({ 
      id: answerId,
      options: {
        include: {
          owner: true,
          users: {
            userId,
            answerId,
            status: UserAnswerStatusEnum.VOTER,
          },
        },
      },
    });
  
    if (!answer) {
      throw new NoEntityWithIdException('Answer')
    }
  
    return {
      answer: answer.entity,
      owner: answer.owner!,
      user: answer.users?.[0],
    };
  }
}