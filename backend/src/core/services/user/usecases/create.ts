import { AlreadyRegisteredException } from '@cloneoverflow/common';
import { User, UserCreds } from '@core/domain/entities/User';
import { UserRepository } from '@core/domain/repositories/user/UserRepository';
import { UserServiceInput } from '../dtos/UserServiceInput';
import { IUserCreateUseCase } from '../types/usecases';

export class UserCreateUseCase implements IUserCreateUseCase {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async execute (
    { email, password, name, username, about }: UserServiceInput.Create,
  ): Promise<User> {
    const existingUser = await this.userRepository.getUser({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      throw new AlreadyRegisteredException();
    }
  
    const creds = UserCreds.new({
      email,
      password,
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