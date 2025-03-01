import { UserRepository } from '@core/repositories/user/UserRepository';
import { UserGetInput, UserGetOutput } from './dto';
import { IUserGetUseCase } from './type';

export class UserGetUseCase implements IUserGetUseCase {
  constructor (
    private userRepository: UserRepository, 
  ) {}

  async execute ({ userId }: UserGetInput): Promise<UserGetOutput> {
    return await this.userRepository.getById({ userId });
  }
}