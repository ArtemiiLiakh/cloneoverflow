import { VerificationCodeType } from '@cloneoverflow/common';

export namespace AuthServiceInput {
  export type Login = {
    email: string,
    password: string,
  };
  
  export type SignUp = {
    email: string;
    password: string;
    name: string;
    username: string;
    about: string;
  };

  export type GetMe = {
    executorId: string,
  };

  export type DeleteAccount = {
    executorId: string, 
    code: string,
    email: string,
    password: string,
  }

  export type RefreshToken = {
    userId: string,
  };

  export type ChangePassword = {
    executorId: string, 
    code: string,
    email: string,
    newPassword: string,
    oldPassword: string,
  };
  
  export type ForgotPassword = {
    email: string;
    code: string;
    newPassword: string;
  };

  export type SendVerificationCode = {
    email: string;
    codeType: VerificationCodeType,
  };
}