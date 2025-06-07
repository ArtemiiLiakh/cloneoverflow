import { UserRepository } from '@core/user/repository/UserRepository';
import { UserGetInput, UserGetOutput } from './dto';
import { IUserGetUseCase } from './type';

export class UserGetUseCase implements IUserGetUseCase {
  constructor (
    private userRepository: UserRepository, 
  ) {}

  async execute ({ userId }: UserGetInput): Promise<UserGetOutput> {
    return this.userRepository.getById({ userId });
  }
}