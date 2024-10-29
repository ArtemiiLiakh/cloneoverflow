import { DataEncryptor } from "@app/interfaces/security/DataEncryptor";
import { DataHasher } from "@app/interfaces/security/DataHasher";
import { AuthSignupDTO } from "@cloneoverflow/common";
import { IUserCreateUseCase } from "@core/service/user/types/usecases";
import { AuthServiceOutput } from "../dto/AuthServiceOutput";
import { ISignUpUseCase } from "../types/usecases";
import { makeAccessToken } from "./utils/makeAccessToken";
import { makeRefreshToken } from "./utils/makeRequestToken";
import { AuthServiceInput } from "../dto/AuthServiceInput";

export class SignUpUseCase implements ISignUpUseCase {
  constructor (
    private dataEncryptor: DataEncryptor,
    private dataHasher: DataHasher,
    private userCreateUseCase: IUserCreateUseCase,
  ) {}

  async execute({ email, name, password, username, about }: AuthServiceInput.SignUp): Promise<AuthServiceOutput.SignUp> {
    const hashedPassword = await this.dataHasher.hash(password);
  
    const user = await this.userCreateUseCase.execute({ 
      email, 
      password: hashedPassword, 
      name, 
      username, 
      about, 
    });
  
    const access_token = await makeAccessToken(this.dataEncryptor, {
      userId: user.id,
      status: user.status,
    });
  
    const refresh_token = await makeRefreshToken(this.dataEncryptor, {
      userId: user.id,
      status: user.status,
    });
  
    return {
      user,
      tokens: {
        access_token,
        refresh_token,
      },
    };
  }
}