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
  };

  export type Update = {
    executorId: string, 
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