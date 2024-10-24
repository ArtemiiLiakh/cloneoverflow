import { User } from "@core/domain/entities/User";

export namespace AuthServiceOutput {
  export type Login = {
    user: User,
    tokens: {
      access_token: string, 
      refresh_token: string,
    },
  };

  export type CreateAccount = {
    user: User,
    tokens: {
      access_token: string, 
      refresh_token: string,
    },
  };
  
  export type DeleteAccount = User;

  export type RefreshToken = {
    access_token: string,
  };

  export type ChangePassword = User;
  export type GetMe = User;
  export type ForgotPassword = void;
  export type ForgotPasswordResolve = void;
}