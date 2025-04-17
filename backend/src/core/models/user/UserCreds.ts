export class UserCreds {
  constructor (
    public userId: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new ({
    userId,
    email,
    password,
    createdAt,
    updatedAt,
  }: {
    userId: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  }): UserCreds {
    return new UserCreds(
      userId,
      email, 
      password,
      createdAt,
      updatedAt,
    );
  }
}