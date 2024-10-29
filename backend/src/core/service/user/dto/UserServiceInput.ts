import { UserIncludeEnum } from "@cloneoverflow/common";

export namespace UserServiceInput {
  export type Create = {
    email: string,
    password: string,
    name: string,
    username: string,
    about: string,
  };

  export type Get = {
    userId: string,
    include?: UserIncludeEnum[],
  };

  export type Update = {
    userId: string, 
    data: {
      name?: string,
      username?: string,
      about?: string,
    }
  };

  export type GetProfile = {
    userId: string
  };
}