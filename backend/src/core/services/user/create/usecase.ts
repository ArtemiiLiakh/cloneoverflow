import { AlreadyRegisteredException } from '@cloneoverflow/common';
import { DataHasher } from '@common/encryption/DataHasher';
import { User, UserCreds } from '@core/models';
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