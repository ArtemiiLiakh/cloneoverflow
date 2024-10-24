import { DataEncryptor } from "@app/interfaces/security/DataEncryptor";
import { DataHasher } from "@app/interfaces/security/DataHasher";
import { LoginException } from "@cloneoverflow/common";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { AuthServiceInput } from "../dto/AuthServiceInput";
import { AuthServiceOutput } from "../dto/AuthServiceOutput";
import { ILoginUseCase } from "../types/usecases";
import { makeAccessToken } from "./utils/makeAccessToken";
import { makeRefreshToken } from "./utils/makeRequestToken";

export class LoginUseCase implements ILoginUseCase {
  constructor (
    private userRepository: UserRepository,
    private dataEncryptor: DataEncryptor,
    private dataHasher: DataHasher,
  ) {}

  async execute({ email, password }: AuthServiceInput.Login): Promise<AuthServiceOutput.Login> {
    const user = await this.userRepository.findWithCreds({
      where: { email },
      options: {
        include: {
          answers: true,
        }
      }
    });
  
    if (!user) {
      throw new LoginException();
    }
  
    if (!await this.dataHasher.compareHash(password, user.creds.password)) {
      throw new LoginException();
    }
    
    const access_token = await makeAccessToken(this.dataEncryptor, {
      userId: user.user.id,
      status: user.user.status,
    });
  
    const refresh_token = await makeRefreshToken(this.dataEncryptor, {
      userId: user.user.id,
      status: user.user.status,
    });
  
    return {
      user: user.user,
      tokens: {
        access_token,
        refresh_token,
      },
    };
  }
}