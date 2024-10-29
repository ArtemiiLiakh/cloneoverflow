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
    id: string,
  };

  export type DeleteAccount = {
    userId: string, 
    creds: {
      email: string,
      password: string,
    }
  }

  export type RefreshToken = {
    userId: string,
  };

  export type ChangePassword = {
    userId: string, 
    data: {
      email: string,
      oldPassword: string,
    },
  };
  
  export type ChangePasswordResolve = {
    userId: string, 
    data: {
      code: string,
      newPassword: string,
    },
  };

  export type ForgotPassword = {
    email: string
  };

  export type ForgotPasswordResolve = {
    email: string;
    code: string;
    newPassword: string;
  };
}