import { AuthLoginDTO, UserUpdateDTO } from "@cloneoverflow/common";

export namespace UserServiceInput {
  export type Get = {
    userId: string
  };

  export type Update = {
    userId: string, 
    data: UserUpdateDTO
  };

  export type GetProfile = {
    userId: string
  };
}