import { ForbiddenException, NoEntityWithIdException, QuestionUserStatusEnum } from '@cloneoverflow/common';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { QuestionUserRepository } from '@core/domain/repositories/question/QuestionUserRepository';
import { QuestionServiceInput } from '../dtos/QuestionServiceInput';
import { QuestionServiceOutput } from '../dtos/QuestionServiceOutput';
import { IQuestionVoteUseCase } from '../types/usecases';
import { UnitOfWork } from '@core/domain/repositories/UnitOfWork';
import { QuestionUser } from '@core/domain/entities/QuestionUser';

export class QuestionVoteUseCase implements IQuestionVoteUseCase {
  constructor (
    private questionRepository: QuestionRepository,
    private questionUserRepository: QuestionUserRepository,
    private unitOfWork: UnitOfWork,
  ) {}
  
  async execute (
    { executorId, questionId, vote }: QuestionServiceInput.VoteQuestion,
  ): Promise<QuestionServiceOutput.VoteQuestion> {
    
    const question = await this.questionRepository.getPartialById({
      questionId,
      select: {
        ownerId: true,
      },
    });
  
    if (!question) {
      throw new NoEntityWithIdException('Question');
    }
  
    if (question.ownerId === executorId) {
      throw new ForbiddenException('You cannot vote your own question');
    }
  
    const questionVoter = await this.questionUserRepository.getOne({
      where: { 
        questionId, 
        userId: executorId,
        status: QuestionUserStatusEnum.VOTER, 
      },
    });
  
    if (questionVoter?.voteType === vote) {
      throw new ForbiddenException('You cannot vote question more than one time');
    }
  
    await this.unitOfWork.execute(async (unit) => {
      if (!questionVoter) {
        await unit.questionUserRepository.create({
          user: QuestionUser.new({
            userId: executorId,
            questionId,
            status: QuestionUserStatusEnum.VOTER,
            voteType: vote,
          }),
        });
      }
      else {
        await unit.questionUserRepository.update({
          questionUserId: questionVoter.id,
          data: {
            voteType: questionVoter.voteType === null ? vote : null,
          },
        });
      }
  
      await unit.questionRepository.addRating({
        questionId,
        voteType: vote,
      });
    });
  }
}