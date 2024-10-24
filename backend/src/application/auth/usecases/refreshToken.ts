import { DataEncryptor } from "@app/interfaces/security/DataEncryptor";
import { UnauthorizedException } from "@cloneoverflow/common";
import { UserRepository } from "@core/domain/repositories/user/UserRepository";
import { AuthServiceInput } from "../dto/AuthServiceInput";
import { AuthServiceOutput } from "../dto/AuthServiceOutput";
import { IRefreshTokenUseCase } from "../types/usecases";
import { makeAccessToken } from "./utils/makeAccessToken";

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor (
    private dataEncryptor: DataEncryptor,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId }: AuthServiceInput.RefreshToken): Promise<AuthServiceOutput.RefreshToken> {
    const user = await this.userRepository.findById({ id: userId });

    if (!user) {
      throw new UnauthorizedException();
    }
  
    return {
      access_token: makeAccessToken(this.dataEncryptor, {
        userId: user.entity.id,
        status: user.entity.status,
      }),
    };
  }
}