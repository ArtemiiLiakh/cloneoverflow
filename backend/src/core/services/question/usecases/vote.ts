import { ForbiddenException, NoEntityWithIdException, QuestionUserStatusEnum, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionUserStats } from '@core/domain/entities/QuestionUserStats';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionVoteUseCase } from '../types/usecases';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';

export class QuestionVoteUseCase implements IQuestionVoteUseCase {
  constructor (
    private valdiateUserUseCase: IValidateUserUseCase, 
    private questionRepository: QuestionRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, vote }: QuestionServiceInput.VoteQuestion,
  ): Promise<QuestionServiceOutput.VoteQuestion> {
    await this.valdiateUserUseCase.validate({
      userId: executorId,
    });

    const question = await this.questionRepository.findById({
      id: questionId,
      options: {
        include: {
          owner: true,
          users: {
            userId: executorId,
            questionId,
            status: QuestionUserStatusEnum.VOTER,
          },
        },
      },
    });
  
    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  
    if (question.entity.ownerId === executorId) {
      throw new ForbiddenException('You cannot vote your own question');
    }
  
    const questionVoter = question.users?.[0];
  
    if (questionVoter?.voteType === vote) {
      throw new ForbiddenException('You cannot vote question more than one time');
    }
  
    const rateIncrement = vote === VoteTypeEnum.UP ? 1 : -1;
    const newQuestionRate = question.entity.rate + rateIncrement;
    const newQuestionOwnerRate = question.owner!.reputation + rateIncrement;
  
    await this.unitOfWork.execute(async (unit) => {
      if (!questionVoter) {
        await unit.questionUserRepository.create({
          user: QuestionUserStats.new({
            userId: executorId,
            questionId,
            status: QuestionUserStatusEnum.VOTER,
            voteType: vote,
          }),
        });
      }
      else {
        await unit.questionUserRepository.update({
          where: {
            id: questionVoter.id,
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
        },
      });
    });
  }
}