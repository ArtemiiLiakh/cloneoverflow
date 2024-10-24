import { AuthLoginDTO, AuthSignupDTO, AuthChangePasswordDTO, AuthForgotPasswordResolveDTO } from "@cloneoverflow/common";

export namespace AuthServiceInput {
  export type Login = AuthLoginDTO;

  export type CreateAccount = AuthSignupDTO;

  export type DeleteAccount = {
    userId: string, 
    creds: AuthLoginDTO
  }

  export type RefreshToken = {
    userId: string
  };

  export type ChangePassword = {
    userId: string, 
    data: AuthChangePasswordDTO,
  };

  export type ForgotPassword = {
    email: string
  };

  export type ForgotPasswordResolve = AuthForgotPasswordResolveDTO;
}