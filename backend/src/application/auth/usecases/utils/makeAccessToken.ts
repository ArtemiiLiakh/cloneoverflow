import config from "@/config";
import { AuthPayload } from "@app/auth/data/AuthPayload";
import { TokenPayload, TokenType } from "@app/auth/data/TokenPayload";
import { DataEncryptor } from "@app/interfaces/security/DataEncryptor";

export const makeAccessToken = (
  dataEncryptor: DataEncryptor,
  { userId, status }: AuthPayload,
) => {
  return dataEncryptor.encrypt<TokenPayload>({
    userId,
    status,
    type: TokenType.ACCESS,
  }, {
    expiresIn: config.jwt.accessToken.maxAge
  });
}