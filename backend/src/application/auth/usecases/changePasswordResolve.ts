import { CacheRepository } from "@core/domain/repositories/cache/CacheRepository";
import { AuthServiceInput } from "../dto/AuthServiceInput";
import { IChangePasswordResolveUseCase } from "../types/usecases";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { DataHasher } from "@app/interfaces/security/DataHasher";
import { BadBodyException, NoEntityWithIdException } from "@cloneoverflow/common";

export class ChangePasswordResolveUseCase implements IChangePasswordResolveUseCase {
  constructor (
    private userRepository: UserRepository,
    private cacheRepository: CacheRepository,
    private dataHasher: DataHasher,
  ) {}
  
  async execute({ userId, data }: AuthServiceInput.ChangePasswordResolve): Promise<void> {
    const user = await this.userRepository.findWithCreds({
      where: { id: userId },
    });

    if (!user) {
      throw new NoEntityWithIdException('User');
    }

    const code = await this.cacheRepository.getString(`user:${userId}:changePassword`);

    if (!code) {
      throw new BadBodyException('User does not have verification code')
    }

    if (!await this.dataHasher.compareHash(data.code, code)) {
      throw new BadBodyException('Code does not match');
    }

    await this.cacheRepository.delete(`user:${userId}:changePassword`);

    await this.userRepository.updateCreds({
      id: userId,
      creds: {
        password: await this.dataHasher.hash(data.newPassword),
      },
    });
  }
}