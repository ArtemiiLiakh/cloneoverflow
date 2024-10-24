import { DataEncryptor } from "@app/interfaces/security/DataEncryptor";
import { DataHasher } from "@app/interfaces/security/DataHasher";
import { AlreadyRegisteredException, AuthSignupDTO } from "@cloneoverflow/common";
import { User, UserCreds } from "@core/domain/entities/User";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { AuthServiceOutput } from "../dto/AuthServiceOutput";
import { ICreateAccountUseCase } from "../types/usecases";
import { makeAccessToken } from "./utils/makeAccessToken";
import { makeRefreshToken } from "./utils/makeRequestToken";

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor (
    private dataEncryptor: DataEncryptor,
    private dataHasher: DataHasher,
    private userRepository: UserRepository,
  ) {}

  async execute({ email, name, password, username, about }: AuthSignupDTO): Promise<AuthServiceOutput.CreateAccount> {
    const hashedPassword = await this.dataHasher.hash(password);
  
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
      password: hashedPassword,
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