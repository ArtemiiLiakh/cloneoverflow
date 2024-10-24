import { DataHasher } from "@app/interfaces/security/DataHasher";
import { LoginException, NoEntityWithIdException } from "@cloneoverflow/common";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { AuthServiceInput } from "../dto/AuthServiceInput";
import { AuthServiceOutput } from "../dto/AuthServiceOutput";
import { IChangePasswordUseCase } from "../types/usecases";

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor (
    private userRepository: UserRepository,
    private dataHasher: DataHasher,
  ) {}

  async execute(
    { userId, data: { email, newPassword, oldPassword } }: AuthServiceInput.ChangePassword
  ): Promise<AuthServiceOutput.ChangePassword> {
    const userWithCreds = await this.userRepository.findWithCreds({ where: { id: userId, email } });
  
    if (!userWithCreds) {
      throw new NoEntityWithIdException('User');
    }
  
    const { creds, user } = userWithCreds;
    
    if (!await this.dataHasher.compareHash(oldPassword, creds.password)) {
      throw new LoginException();
    }
  
    await this.userRepository.updateCreds({
      id: userId,
      creds: {
        password: await this.dataHasher.hash(newPassword),
      }
    });
  
    return user;
  }
}