import { User } from '@prisma/client';
import { DbUser } from '../utils/types/DbUser';
import { AuthLoginResponse } from '../responses/auth.login.response';
import { AuthSignInResponse } from '../responses/auth.signin.response';

export class AuthMapper {
  login (user: DbUser): AuthLoginResponse {
    return {
      email: user.email,
      password: user.password,
    };
  }

  signin (user: DbUser): AuthSignInResponse {
    return {
      id: user.id,
      name: user?.userProfile?.name,
      username: user.userProfile?.username,
      reputation: user?.userProfile?.reputation,
      about: user.userProfile?.about,
      status: user.userProfile?.status,
      createdAt: user.createdAt,
    };
  }
}