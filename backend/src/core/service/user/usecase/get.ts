import { NoEntityWithIdException, UserIncludeEnum } from "@cloneoverflow/common";
import { UserRepositoryInput } from "@core/domain/repositories/user/input/UserRepositoryInput";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { UserServiceInput } from "../dto/UserServiceInput";
import { UserServiceOutput } from "../dto/UserServiceOutput";
import { IUserGetUseCase } from "../types/usecases";

export class UserGetUseCase implements IUserGetUseCase {
  constructor (
    private userRepository: UserRepository, 
  ) {}

  async execute({ userId, include }: UserServiceInput.Get): Promise<UserServiceOutput.Get> {
    const userInclude: UserRepositoryInput.UserInclude | undefined = include ? {
      answers: include.includes(UserIncludeEnum.ANSWERS),
      questions: include.includes(UserIncludeEnum.QUESTIONS),
    } : undefined;

    const userCount: UserRepositoryInput.UserCount | undefined = include ? {
      answers: include?.includes(UserIncludeEnum.ANSWERS_AMOUNT),
      questions: include?.includes(UserIncludeEnum.QUESTIONS_AMOUNT),
    } : undefined;
  
    const user = await this.userRepository.findById({ 
      id: userId,
      options: {
        include: userInclude,
        count: userCount,
      }
    });
    
    if (!user) {
      throw new NoEntityWithIdException('User');
    }
    
    return {
      entity: user.entity,
      answers: user.answers,
      questions: user.questions,
      answersAmount: user.counts?.answers,
      questionsAmount: user.counts?.questions,
    };
  }
}