import { ForbiddenException, NoEntityWithIdException, VoteType } from "@cloneoverflow/common";
import { UserQuestionStatusEnum } from "@common/enums/UserQuestionStatus";
import { QuestionUserStats } from "@core/domain/entities/QuestionUserStats";
import { QuestionRepository } from "@core/domain/repositories/question/QuestionRepository";
import { UnitOfWork } from "@core/domain/repositories/UnitOfWork";
import { QuestionServiceInput } from "../dto/QuestionServiceInput";
import { QuestionServiceOutput } from "../dto/QuestionServiceOutput";
import { IQuestionVoteUseCase } from "../types/usecases";

export class QuestionVoteUseCase implements IQuestionVoteUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute({ userId, questionId, vote }: QuestionServiceInput.VoteQuestion): Promise<QuestionServiceOutput.VoteQuestion> {
    const question = await this.questionRepository.findById({
      id: questionId,
      options: {
        include: {
          owner: true,
          users: {
            userId,
            questionId,
            status: UserQuestionStatusEnum.VOTER,
          },
        }
      }
    });
  
    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  
    if (question.entity.ownerId === userId) {
      throw new ForbiddenException('You cannot vote your own question');
    }
  
    const questionVoter = question.users?.[0];
  
    if (questionVoter?.voteType === vote) {
      throw new ForbiddenException('You cannot vote question more than one time');
    }
  
    const newQuestionRate = question.entity.rate + (vote === VoteType.UP ? 1 : -1);
    const newQuestionOwnerRate = question.owner!.reputation + (vote === VoteType.UP ? 1 : -1);
  
    await this.unitOfWork.execute(async (unit) => {
      if (!questionVoter) {
        await unit.questionUserRepository.create({
          user: QuestionUserStats.new({
            userId,
            questionId,
            status: UserQuestionStatusEnum.VOTER,
            voteType: vote,
          })
        });
      } else {
        await unit.questionUserRepository.update({
          where: {
            id: questionVoter.id
          },
          data: {
            voteType: questionVoter.voteType === null ? vote : null,
          },
        });
      }
  
      await unit.questionRepository.update({
        id: questionId,
        question: {
          rate: newQuestionRate,
        },
      });
  
      await unit.userRepository.update({
        id: question.entity.ownerId,
        user: {
          reputation: newQuestionOwnerRate,
        }
      });
    });
  }
}