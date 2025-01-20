import { OrderByEnum } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { AnswerRepositoryOutput } from '@core/domain/repositories/answer/dtos/AnswerRepositoryOutput';
import { QuestionRepositoryOutput } from '@core/domain/repositories/question/dtos/QuestionRepositoryOutput';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserGetProfileInput, UserGetProfileOutput } from './dto';
import { IUserGetProfileUseCase } from './type';
import { getProfileOutputMapper } from './mapper';

export class UserGetProfileUseCase implements IUserGetProfileUseCase {
  constructor (
    private userRepository: UserRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}
 
  async execute ({ userId }: UserGetProfileInput): Promise<UserGetProfileOutput> {
    const user = await this.userRepository.getUser({
      where: { userId },
      counts: {
        answers: true,
        questions: true,
      },
    });

    let bestAnswer: AnswerRepositoryOutput.GetPartialAnswer | null = null;
    if (await this.answerRepository.isExist({ ownerId: userId })) {
      bestAnswer = await this.answerRepository.getPartialAnswer({
        where: { ownerId: userId },
        select: {
          id: true,
          ownerId: true,
          questionId: true,
          rating: true,
          isSolution: true,
          createdAt: true,
        },
        include: {
          question: true,
        },
        orderBy: [ 
          { rating: OrderByEnum.DESC },
          { isSolution: OrderByEnum.DESC },
        ],
      });
    }
    
    let bestQuestion: QuestionRepositoryOutput.GetPartialQuestion | null = null;
    if (await this.questionRepository.isExist({ ownerId: userId })) {
      bestQuestion = await this.questionRepository.getPartialQuestion({
        where: { ownerId: userId },
        select: {
          id: true,
          ownerId: true,
          title: true,
          rating: true,
          views: true,
          isClosed: true,
          createdAt: true,
        },
        include: {
          tags: true,
        },
        counts: {
          answers: true,
        },
        orderBy: [
          { rating: OrderByEnum.DESC }, 
          { answersAmount: OrderByEnum.DESC },
        ],
      });
    }
  
    return getProfileOutputMapper({
      user,
      bestQuestion,
      bestAnswer,
    });
  }
}