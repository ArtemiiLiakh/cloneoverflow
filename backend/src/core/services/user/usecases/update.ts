import { BadBodyException } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserServiceInput } from '../dtos/UserServiceInput';
import { UserServiceOutput } from '../dtos/UserServiceOutput';
import { IUserUpdateUseCase } from '../types/usecases';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';

export class UserUpdateUseCase implements IUserUpdateUseCase {
  constructor (
    private userRepository: UserRepository,
    private validateUserUseCase: IValidateUserUseCase,
  ) {}

  async execute ({ 
    executorId, 
    data: { name, username, about },
  }: UserServiceInput.Update): Promise<UserServiceOutput.Update> {
    await this.validateUserUseCase.execute({ userId: executorId });

    if (username) {
      const userWithUsername = await this.userRepository.getPartialUser({ 
        where: { username },
        select: { id: true },
      });
  
      if (userWithUsername && userWithUsername.entity.id !== executorId) {
        throw new BadBodyException('Username already exists');
      }
    }
  
    return this.userRepository.update({
      userId: executorId,
      user: {
        name,
        username,
        about,
      },
      returnEntity: true,
    }).then(user => user!);
  }
}