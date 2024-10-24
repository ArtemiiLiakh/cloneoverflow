import config from "@/config";
import { AuthPayload } from "@app/auth/data/AuthPayload";
import { TokenPayload, TokenType } from "@app/auth/data/TokenPayload";
import { DataEncryptor } from "@app/interfaces/security/DataEncryptor";

export const makeRefreshToken = (
  dataEncryptor: DataEncryptor,
  payload: AuthPayload
) => {
  return dataEncryptor.encrypt<TokenPayload>({
    userId: payload.userId,
    status: payload.status,
    type: TokenType.REFRESH,
  }, {
    expiresIn: config.jwt.refreshToken.maxAge
  });
}