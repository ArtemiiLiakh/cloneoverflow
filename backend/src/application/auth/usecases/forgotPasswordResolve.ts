import config from "@/config";
import { DataHasher } from "@app/interfaces/security/DataHasher";
import { BadBodyException, RetriesExpiredException } from "@cloneoverflow/common";
import { CacheRepository } from "@core/domain/repositories/cache/CacheRepository";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { PasswordCodeData } from "../data/PasswordCodeData";
import { AuthServiceInput } from "../dto/AuthServiceInput";
import { AuthServiceOutput } from "../dto/AuthServiceOutput";
import { IForgotPasswordResolveUseCase } from "../types/usecases";

export class ForgotPasswordResolveUseCase implements IForgotPasswordResolveUseCase {
  constructor (
    private cacheRepository: CacheRepository,
    private userRepository: UserRepository,
    private dataHasher: DataHasher,
  ) {}

  async execute(
    { code, email, newPassword }: AuthServiceInput.ForgotPasswordResolve,
  ): Promise<AuthServiceOutput.ForgotPasswordResolve> {
    const user = await this.userRepository.findWithCreds({
      where: {
        email,
      },
    });
    
    if (!user) {
      throw new BadBodyException('No user with this email');
    }
  
    const savedCode = await this.cacheRepository.getObject<PasswordCodeData>(`user:${user.creds.id}:forgotPassword`);  
  
    if (!savedCode) {
      throw new BadBodyException('User does not have verification code')
    }
  
    if (savedCode.retries > config.cache.CODE_RETRIES) {
      await this.cacheRepository.delete(`user:${user.creds.id}:forgotPassword`)
  
      throw new RetriesExpiredException();
    }
  
    if (!await this.dataHasher.compareHash(code, savedCode.code)) {
      await this.cacheRepository.setObject<PasswordCodeData>(`user:${user.creds.id}:forgotPassword`, {
        code: savedCode.code,
        retries: savedCode.retries+1, 
      });
  
      throw new BadBodyException('Code does not match');
    }
  
    await this.cacheRepository.delete(`user:${user.creds.id}:forgotPassword`);
  
    await this.userRepository.updateCreds({
      id: user.creds.id,
      creds: {
        password: await this.dataHasher.hash(newPassword),
      },
    });
  }
}