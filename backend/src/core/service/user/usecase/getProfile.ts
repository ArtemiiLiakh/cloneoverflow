import { NoEntityWithIdException, OrderByEnum } from '@cloneoverflow/common';
import { AnswerRepository } from '@core/domain/repositories/answer/AnswerRepository';
import { QuestionRepository } from '@core/domain/repositories/question/QuestionRepository';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserServiceInput } from '../dto/UserServiceInput';
import { UserServiceOutput } from '../dto/UserServiceOutput';
import { IUserGetProfileUseCase } from '../types/usecases';

export class UserGetProfileUseCase implements IUserGetProfileUseCase {
  constructor (
    private userRepository: UserRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}
 
  async execute ({ userId }: UserServiceInput.GetProfile): Promise<UserServiceOutput.GetProfile> {
    const user = await this.userRepository.findById({
      id: userId,
      options: {
        count: {
          answers: true,
          questions: true,
        },
      },
    });
    
    const bestAnswer = await this.answerRepository.findOne({
      where: {
        ownerId: userId,
      },
      options: {
        orderBy: {
          rate: OrderByEnum.DESC,
        },
      },
    });
    
    const bestQuestion = await this.questionRepository.findOne({
      where: { ownerId: userId },
      options: {
        include: {
          tags: true,
        },
        count: {
          answers: true,
        },
        orderBy: [{
          rate: OrderByEnum.DESC,
        }, {
          answers: OrderByEnum.DESC,
        }],
      },
    });
  
    if (!user) {
      throw new NoEntityWithIdException('User');
    }
  
    return { 
      user: user.entity, 
      bestQuestion: bestQuestion ? {
        entity: bestQuestion.entity,
        tags: bestQuestion.tags!,
        answersAmount: bestQuestion.counts?.answers ?? 0,
      } : null, 
      bestAnswer: bestAnswer ? {
        entity: bestAnswer.entity,
        question: bestAnswer.question!,
      } : null,
      answersAmount: user.counts?.answers ?? 0,
      questionsAmount: user.counts?.questions ?? 0,
    }; 
  }
}