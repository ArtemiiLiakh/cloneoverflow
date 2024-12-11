import { BadBodyException } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserServiceInput } from '../dtos/UserServiceInput';
import { UserServiceOutput } from '../dtos/UserServiceOutput';
import { IUserUpdateUseCase } from '../types/usecases';

export class UserUpdateUseCase implements IUserUpdateUseCase {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async execute ({ 
    executorId, 
    data: { name, username, about },
  }: UserServiceInput.Update): Promise<UserServiceOutput.Update> {
    if (username) {
      const userWithUsername = await this.userRepository.getByUsername({ username });
  
      if (userWithUsername && userWithUsername.id !== executorId) {
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