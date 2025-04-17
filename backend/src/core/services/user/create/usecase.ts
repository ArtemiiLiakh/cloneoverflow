import { AlreadyRegisteredException } from '@cloneoverflow/common';
import { DataHasher } from '@common/encryption/DataHasher';
import { UserRepository } from '@core/repositories/user/UserRepository';
import { UserCreateInput, UserCreateOutput } from './dto';
import { IUserCreateUseCase } from './type';

export class UserCreateUseCase implements IUserCreateUseCase {
  constructor (
    private userRepository: UserRepository,
    private dataHasher: DataHasher,
  ) {}

  async execute (
    { email, password, name, username, about }: UserCreateInput,
  ): Promise<UserCreateOutput> {
    const isUserExists = await this.userRepository.isExist({
      email,
      username,
    });
    
    if (isUserExists) {
      throw new AlreadyRegisteredException();
    }
  
    return this.userRepository.create({
      creds: {
        email,
        password: await this.dataHasher.hash(password),
      },
      user: {
        name,
        username,
        about,
      },
    });
  }
}