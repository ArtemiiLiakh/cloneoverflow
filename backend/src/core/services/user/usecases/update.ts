import { BadBodyException, ForbiddenException } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { IValidateUserUseCase } from '@core/services/validation/types/usecases';
import { UserServiceInput } from '../dtos/UserServiceInput';
import { UserServiceOutput } from '../dtos/UserServiceOutput';
import { IUserUpdateUseCase } from '../types/usecases';

export class UserUpdateUseCase implements IUserUpdateUseCase {
  constructor (
    private validateUserUseCase: IValidateUserUseCase,
    private userRepository: UserRepository,
  ) {}

  async execute ({ 
    executorId, 
    userId, 
    data: { name, username, about },
  }: UserServiceInput.Update): Promise<UserServiceOutput.Update> {
    if (executorId !== userId) {
      throw new ForbiddenException();
    }
    
    await this.validateUserUseCase.validate({
      userId: executorId,
    });

    if (username) {
      const userWithUsername = await this.userRepository.findByUsername({ username });
  
      if (userWithUsername && userWithUsername.entity.id !== userId) {
        throw new BadBodyException('Username already exists');
      }
    }
  
    return this.userRepository.update({
      id: userId,
      user: {
        name,
        username,
        about,
      },
      returnEntity: true,
    }).then(user => user!);
  }
}