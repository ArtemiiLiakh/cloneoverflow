import { Answer } from "@core/domain/entities/Answer";
import { AnswerUserStats } from "@core/domain/entities/AnswerUserStats";
import { UnitOfWork } from "@core/domain/repositories/UnitOfWork";
import { AnswerServiceInput } from "../dto/AnswerServiceInput";
import { IAnswerCreateUseCase } from "../types/usecases";
import { AnswerServiceOutput } from "../dto/AnswerServiceOutput";
import { UserAnswerStatusEnum } from "@cloneoverflow/common";

export class AnswerCreateUseCase implements IAnswerCreateUseCase {
  constructor (
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute({ ownerId, data }: AnswerServiceInput.Create): Promise<AnswerServiceOutput.Create> {
    const answer = await this.unitOfWork.execute(async (unit) => {
      const answer = Answer.new({
        ownerId,
        questionId: data.questionId,
        text: data.text,
      });
  
      await unit.answerRepository.create({
        answer,
      });
  
      await unit.answerUserRepository.create({
        user: AnswerUserStats.new({
          userId: ownerId,
          answerId: answer.id,
          status: UserAnswerStatusEnum.OWNER,
        }),
      });
  
      return answer;
    });
  
    if (!answer) {
      throw new Error('Answer creation failed')
    }
  
    return answer;
  }
}