import config from "@/config";
import { EmailProvider } from "@app/interfaces/email/EmailProvider";
import { DataHasher } from "@app/interfaces/security/DataHasher";
import { LoginException, NoEntityWithIdException } from "@cloneoverflow/common";
import { CacheRepository } from "@core/domain/repositories/cache/CacheRepository";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { randomBytes } from "crypto";
import { AuthServiceInput } from "../dto/AuthServiceInput";
import { AuthServiceOutput } from "../dto/AuthServiceOutput";
import { IChangePasswordUseCase } from "../types/usecases";

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor (
    private emailProvider: EmailProvider,
    private cacheRepository: CacheRepository,
    private userRepository: UserRepository,
    private dataHasher: DataHasher,
  ) {}

  async execute(
    { userId, data: { email, oldPassword } }: AuthServiceInput.ChangePassword
  ): Promise<AuthServiceOutput.ChangePassword> {
    const userWithCreds = await this.userRepository.findWithCreds({ where: { id: userId, email } });
  
    if (!userWithCreds) {
      throw new NoEntityWithIdException('User');
    }
  
    const { creds } = userWithCreds;
    
    if (!await this.dataHasher.compareHash(oldPassword, creds.password)) {
      throw new LoginException();
    }

    const changePasswordCode = randomBytes(3).toString('hex');

    this.cacheRepository.setString(
      `user:${userId}:changePassword`, 
      await this.dataHasher.hash(changePasswordCode), 
      { ttl: config.cache.CODE_EXPIRATION_TIME }
    );
    this.emailProvider.sendEmail(email, `Attention!. You are going to change a password. Enter the verification code to change it: ${changePasswordCode}`);
  }
}