export class UserCreds {
  constructor (
    public userId: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static new (properties: {
    userId: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  }): UserCreds {
    return new UserCreds(
      properties.userId,
      properties.email, 
      properties.password,
      properties.createdAt,
      properties.updatedAt,
    );
  }
}