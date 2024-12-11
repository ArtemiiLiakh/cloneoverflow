import { NoEntityWithIdException } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserServiceInput } from '../dtos/UserServiceInput';
import { UserServiceOutput } from '../dtos/UserServiceOutput';
import { IUserGetUseCase } from '../types/usecases';

export class UserGetUseCase implements IUserGetUseCase {
  constructor (
    private userRepository: UserRepository, 
  ) {}

  async execute ({ userId }: UserServiceInput.Get): Promise<UserServiceOutput.Get> {
    const user = await this.userRepository.getUser({ 
      where: { userId },
      counts: {
        questions: true,
        answers: true,
      },
    });

    if (!user) {
      throw new NoEntityWithIdException('User');
    }

    return {
      entity: user.entity,
      answersAmount: user.counts!.questions ?? 0,
      questionsAmount: user.counts!.answers ?? 0,
    };
  }
}