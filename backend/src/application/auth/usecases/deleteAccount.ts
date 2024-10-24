import { DataHasher } from "@app/interfaces/security/DataHasher";
import { BadBodyException } from "@cloneoverflow/common";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { AuthServiceInput } from "../dto/AuthServiceInput";
import { AuthServiceOutput } from "../dto/AuthServiceOutput";
import { IDeleteAccountUseCase } from "../types/usecases";

export class DeleteAccountUseCase implements IDeleteAccountUseCase {
  constructor (
    private userRepository: UserRepository,
    private dataHasher: DataHasher,
  ) {}

  async execute({ userId, creds }: AuthServiceInput.DeleteAccount): Promise<AuthServiceOutput.DeleteAccount> {
    const confirmUser = await this.userRepository.findWithCreds({
      where: { id: userId },
    });
  
    if (!confirmUser) {
      throw new BadBodyException("Invalid user id");
    }
    if (confirmUser.creds.email !== creds.email){
      throw new BadBodyException("Invalid email or password");
    }
    if (!await this.dataHasher.compareHash(creds.password, confirmUser.creds.password)){
      throw new BadBodyException("Invalid email or password");
    }
  
    await this.userRepository.delete({ 
      user: confirmUser.user,
    });
  
    return confirmUser.user;
  }
}