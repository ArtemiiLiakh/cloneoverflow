import { User, UserCreds } from "@core/domain/entities/User";
import { UserServiceInput } from "../dto/UserServiceInput";
import { IUserCreateUseCase } from "../types/usecases";
import { AlreadyRegisteredException } from "@cloneoverflow/common";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";

export class UserCreateUseCase implements IUserCreateUseCase {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async execute({ email, password, name, username, about }: UserServiceInput.Create): Promise<User> {
    const existingUser = await this.userRepository.findWithCreds({
      where: {
        OR: [
          { email },
          { username }
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
    
    await this.userRepository.create({
      user, 
      creds,
    });

    return user;
  }
}