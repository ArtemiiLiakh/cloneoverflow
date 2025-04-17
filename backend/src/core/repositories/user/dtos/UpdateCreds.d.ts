export type UserRepoUpdateCredsInput = {
  userId: string,
  data: {
    email?: string,
    password?: string,
  }
}

export type UserRepoUpdateCredsOutput = void;