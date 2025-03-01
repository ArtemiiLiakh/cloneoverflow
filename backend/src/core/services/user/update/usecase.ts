import { BadBodyException } from '@cloneoverflow/common';
import { UserRepository } from '@core/repositories/user/UserRepository';
import { UserUpdateInput, UserUpdateOutput } from './dto';
import { IUserUpdateUseCase } from './type';

export class UserUpdateUseCase implements IUserUpdateUseCase {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async execute ({ 
    executorId, 
    data: { name, username, about },
  }: UserUpdateInput): Promise<UserUpdateOutput> {
    if (username) {
      if (await this.userRepository.isExist({ username })) {
        throw new BadBodyException('Username already exists');
      }
    }

    
    return await this.userRepository.update({
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