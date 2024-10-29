import { AnswerIncludeEnum, NoEntityWithIdException, UserAnswerStatusEnum } from "@cloneoverflow/common";
import { AnswerRepository } from "@core/domain/repositories/answer/AnswerRepository";
import { AnswerServiceInput } from "../dto/AnswerServiceInput";
import { AnswerServiceOutput } from "../dto/AnswerServiceOutput";
import { IAnswerGetUseCase } from "../types/usecases";
import { AnswerRepositoryInput } from "@core/domain/repositories/answer/input/AnswerRepositoryInput";

export class AnswerGetUseCase implements IAnswerGetUseCase {
  constructor (
    private answerRepository: AnswerRepository,
  ) {}

  async execute({ userId, answerId, include }: AnswerServiceInput.Get): Promise<AnswerServiceOutput.Get> {
    const answerInclude: AnswerRepositoryInput.AnswerInclude | undefined = include ? {
      owner: include.includes(AnswerIncludeEnum.OWNER),
      question: include.includes(AnswerIncludeEnum.QUESTION),
      users: include.includes(AnswerIncludeEnum.VOTER) ? {
        userId,
        answerId,
        status: UserAnswerStatusEnum.VOTER, 
      } : undefined,
    } : undefined;

    const answer =  await this.answerRepository.findById({ 
      id: answerId,
      options: {
        include: answerInclude,
      },
    });
  
    if (!answer) {
      throw new NoEntityWithIdException('Answer')
    }
  
    return {
      entity: answer.entity,
      owner: answer.owner,
      question: answer.question,
      user: answer.users?.[0],
    };
  }
}