import { ForbiddenException, NoEntityWithIdException, VoteType } from "@cloneoverflow/common";
import { UserAnswerStatusEnum } from "@common/enums/UserAnswerStatus";
import { AnswerUserStats } from "@core/domain/entities/AnswerUserStats";
import { AnswerRepository } from "@core/domain/repositories/answer/AnswerRepository";
import { UnitOfWork } from "@core/domain/repositories/UnitOfWork";
import { AnswerServiceInput } from "../dto/AnswerServiceInput";
import { AnswerServiceOutput } from "../dto/AnswerServiceOutput";
import { IAnswerVoteUseCase } from "../types/usecases";

export class AnswerVoteUseCase implements IAnswerVoteUseCase {
  constructor (
    private answerRepository: AnswerRepository,
    private unitOfWork: UnitOfWork,
  ) {}

  async execute({ userId, answerId, vote }: AnswerServiceInput.VoteAnswer): Promise<AnswerServiceOutput.VoteAnswer> {
    const answer = await this.answerRepository.findById({
      id: answerId,
      options: {
        include: {
          users: {
            userId,
            answerId,
            status: UserAnswerStatusEnum.VOTER,
          },
          owner: true,
        },
      }
    });
  
    if (!answer) {
      throw new NoEntityWithIdException('Answer');
    }
  
    if (answer.entity.ownerId === userId) {
      throw new ForbiddenException('You cannot vote your own answer');
    }
  
    const answerVoter = answer.users?.[0];
  
    if (answerVoter && answerVoter.voteType === vote) {
      throw new ForbiddenException();
    }
  
    const newAnswerRate = answer.entity.rate + (vote === VoteType.UP ? 1 : -1);
    const newAnswerOwnerRate = answer.owner!.reputation + (vote === VoteType.UP ? 1 : -1);
    
    await this.unitOfWork.execute(async (unit) => {
      if (!answerVoter) {
        await unit.answerUserRepository.create({
          user: AnswerUserStats.new({
            userId,
            answerId,
            status: UserAnswerStatusEnum.VOTER,
            voteType: vote,
          }),
        });
      } else {
        await unit.answerUserRepository.update({
          where: {
            id: answerVoter.id,
          },
          data: {
            voteType: answerVoter.voteType === null ? vote : null,
          },
        });
      }
  
      await unit.answerRepository.update({
        id: answerId,
        answer: {
          rate: newAnswerRate,
        },
      });
  
      await unit.userRepository.update({
        id: answer.entity.ownerId,
        user: {
          reputation: newAnswerOwnerRate,
        },
      });
    });
  }
}