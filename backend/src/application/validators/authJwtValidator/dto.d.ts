import { TokenTypeEnum } from '@application/auth/data';

export interface JwtPayload {
  token: string,
  tokenType: TokenTypeEnum,
}
