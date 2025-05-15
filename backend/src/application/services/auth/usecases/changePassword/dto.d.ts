export type ChangePasswordInput = {
  executorId: string, 
  code: string,
  email: string,
  newPassword: string,
  oldPassword: string,
};

export type ChangePasswordOutput = void;
