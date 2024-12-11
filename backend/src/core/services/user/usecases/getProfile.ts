import { NoEntityWithIdException, OrderByEnum } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserServiceInput } from '../dtos/UserServiceInput';
import { UserServiceOutput } from '../dtos/UserServiceOutput';
import { IUserGetProfileUseCase } from '../types/usecases';

export class UserGetProfileUseCase implements IUserGetProfileUseCase {
  constructor (
    private userRepository: UserRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}
 
  async execute ({ userId }: UserServiceInput.GetProfile): Promise<UserServiceOutput.GetProfile> {
    const user = await this.userRepository.getUser({
      where: { userId },
      counts: {
        answers: true,
        questions: true,
      },
    });

    if (!user) {
      throw new NoEntityWithIdException('User');
    }

    const bestAnswer = await this.answerRepository.getPartialAnswer({
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
    
    const bestQuestion = await this.questionRepository.getPartialQuestion({
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
  
    return {
      user: user.entity, 
      bestQuestion: bestQuestion ? {
        entity: {
          questionId: bestQuestion.entity.id!,
          ownerId: bestQuestion.entity.ownerId!,
          title: bestQuestion.entity.title!,
          rating: bestQuestion.entity.rating!,
          views: bestQuestion.entity.views!,
          isClosed: bestQuestion.entity.isClosed!,
          createdAt: bestQuestion.entity.createdAt!,
        },
        tags: bestQuestion.tags ?? [],
        answersAmount: bestQuestion.counts?.answers ?? 0,
      } : null, 
      bestAnswer: bestAnswer ? {
        entity: {
          answerId: bestAnswer.entity.id!,
          ownerId: bestAnswer.entity.ownerId!,
          questionId: bestAnswer.entity.questionId!,
          rating: bestAnswer.entity.rating!,
          isSolution: bestAnswer.entity.isSolution!,
          createdAt: bestAnswer.entity.createdAt!,
        },
        question: {
          questionId: bestAnswer.question!.id,
          ownerId: bestAnswer.question!.ownerId,
          title: bestAnswer.question!.title,
          rating: bestAnswer.question!.rating,
        },
      } : null,
      answersAmount: user.counts?.answers ?? 0,
      questionsAmount: user.counts?.questions ?? 0,
    }; 
  }
}