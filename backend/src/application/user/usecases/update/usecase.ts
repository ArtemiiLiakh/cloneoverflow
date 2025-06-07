import { UserRepository } from '@core/user/repository/UserRepository';
import { UsernameAlreadyExists } from '@core/user/exceptions';
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
        throw new UsernameAlreadyExists();
      }
    }
    
    return this.userRepository.update({
      userId: executorId,
      data: {
        name,
        username,
        about,
      },
    });
  }
}