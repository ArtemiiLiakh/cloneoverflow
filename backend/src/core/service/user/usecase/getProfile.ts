import { NoEntityWithIdException, OrderBy } from "@cloneoverflow/common";
import { AnswerRepository } from "@core/domain/repositories/answer/AnswerRepository";
import { QuestionRepository } from "@core/domain/repositories/question/QuestionRepository";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { UserServiceInput } from "../dto/UserServiceInput";
import { UserServiceOutput } from "../dto/UserServiceOutput";
import { IUserGetProfileUseCase } from "../types/usecases";

export class UserGetProfileUseCase implements IUserGetProfileUseCase {
  constructor (
    private userRepository: UserRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {}
 
  async execute({ userId }: UserServiceInput.GetProfile): Promise<UserServiceOutput.GetProfile> {
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
          rate: OrderBy.DESC,
        },
      },
    });
    
    const bestQuestion = await this.questionRepository.findOne({
      where: { ownerId: userId },
      options: {
        orderBy: [{
          rate: OrderBy.DESC,
        }, {
          answers: OrderBy.DESC,
        }],
      },
    });
  
    if (!user) {
      throw new NoEntityWithIdException('User');
    }
  
    return { 
      user: user.entity, 
      bestQuestion: bestQuestion?.entity ?? null, 
      bestAnswer: bestAnswer?.entity ?? null,
      answersAmount: user.counts?.answers ?? 0,
      questionsAmount: user.counts?.questions ?? 0,
    }; 
  }
}