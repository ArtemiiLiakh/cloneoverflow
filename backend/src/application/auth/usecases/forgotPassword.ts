import config from "@/config";
import { EmailProvider } from "@app/interfaces/email/EmailProvider";
import { DataHasher } from "@app/interfaces/security/DataHasher";
import { BadBodyException } from "@cloneoverflow/common";
import { CacheRepository } from "@core/domain/repositories/cache/CacheRepository";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { randomBytes } from "crypto";
import { PasswordCodeData } from "../data/PasswordCodeData";
import { AuthServiceInput } from "../dto/AuthServiceInput";
import { AuthServiceOutput } from "../dto/AuthServiceOutput";
import { IForgotPasswordUseCase } from "../types/usecases";

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor (
    private userRepository: UserRepository,
    private emailProvider: EmailProvider,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}
  
  async execute({ email }: AuthServiceInput.ForgotPassword): Promise<AuthServiceOutput.ForgotPassword> {
    const user = await this.userRepository.findWithCreds({
      where: {
        email,
      },
    });
    
    if (!user) {
      throw new BadBodyException('No user with this email');
    }
  
    const code = randomBytes(3).toString('hex');
  
    this.emailProvider.sendEmail(email, `Your password resolving code: ${code}`);
    await this.cacheRepository.setObject<PasswordCodeData>(`user:${user.creds.id}:forgotPassword`, {
      code: await this.dataHasher.hash(code),
      retries: 1,
    }, {
      ttl: config.cache.CODE_EXPIRATION_TIME,
    });
  }
}