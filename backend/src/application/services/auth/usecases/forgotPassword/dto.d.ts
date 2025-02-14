export type ForgotPasswordInput = {
  email: string;
  code: string;
  newPassword: string;
};

export type ForgotPasswordOutput = void;