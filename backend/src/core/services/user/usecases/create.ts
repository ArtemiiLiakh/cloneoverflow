import { AlreadyRegisteredException } from '@cloneoverflow/common';
import { User, UserCreds } from '@core/domain/entities/User';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserServiceInput } from '../dtos/UserServiceInput';
import { IUserCreateUseCase } from '../types/usecases';
import { DataHasher } from '@core/data/DataHasher';

export class UserCreateUseCase implements IUserCreateUseCase {
  constructor (
    private userRepository: UserRepository,
    private dataHasher: DataHasher,
  ) {}

  async execute (
    { email, password, name, username, about }: UserServiceInput.Create,
  ): Promise<User> {
    const isUserExists = await this.userRepository.isExist({
      OR: [
        { email },
        { username },
      ],
    });
    
    if (isUserExists) {
      throw new AlreadyRegisteredException();
    }
  
    const creds = UserCreds.new({
      email,
      password: await this.dataHasher.hash(password),
    });
  
    const user = User.new({
      id: creds.id,
      name,
      username,
      about,
    });
    
    await this.userRepository.createWithCreds({
      user, 
      creds,
    });

    return user;
  }
}