import { DbUser } from "../types/database/DbUser";
import { UserUpdateResponse } from "../responses/userUpdate.response";

export class UserMapper {
  update({id, userProfile}: DbUser): UserUpdateResponse {
    return {
      id,
      name: userProfile.name,
      username: userProfile.username,
      about: userProfile.about,
      reputation: userProfile.reputation,
      status: userProfile.status,
      createdAt: userProfile.createdAt,
      updatedAt: userProfile.updatedAt,
    };
  }
}