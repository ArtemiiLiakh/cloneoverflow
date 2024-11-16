import { BadBodyException, ForbiddenException, NoEntityWithIdException } from '@cloneoverflow/common';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserServiceInput } from '../dto/UserServiceInput';
import { UserServiceOutput } from '../dto/UserServiceOutput';
import { IUserUpdateUseCase } from '../types/usecases';

export class UserUpdateUseCase implements IUserUpdateUseCase {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async execute (
    { executorId, userId, data: { name, username, about } }: UserServiceInput.Update,
  ): Promise<UserServiceOutput.Update> {
    if (executorId !== userId) {
      throw new ForbiddenException();
    }
    
    const user = await this.userRepository.findById({ id: userId });

    if (!user) {
      throw new NoEntityWithIdException('User');
    }
  
    if (username) {
      const userWithUsername = await this.userRepository.findOne({
        where: { username },
      });
  
      if (userWithUsername && userWithUsername.entity.id !== userId) {
        throw new BadBodyException('Username already exists');
      }
    }
  
    return await this.userRepository.update({
      id: userId,
      user: {
        name,
        username,
        about,
      },
    });
  }
}