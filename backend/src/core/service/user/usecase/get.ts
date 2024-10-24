import { NoEntityWithIdException } from "@cloneoverflow/common";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { UserServiceInput } from "../dto/UserServiceInput";
import { UserServiceOutput } from "../dto/UserServiceOutput";
import { IUserGetUseCase } from "../types/usecases";

export class UserGetUseCase implements IUserGetUseCase {
  constructor (
    private userRepository: UserRepository, 
  ) {}

  async execute({ userId }: UserServiceInput.Get): Promise<UserServiceOutput.Get> {
    const user = await this.userRepository.findById({ id: userId });
    
    if (!user) {
      throw new NoEntityWithIdException('User');
    }
    
    return user.entity;
  }
}