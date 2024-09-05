import { User } from "../models/User";
import { UserProfile } from "../models/UserProfile";

export interface UserRepository {
  getById(id: string): UserProfile;
  getBy(field: keyof UserProfile, value: any): UserProfile;
  getCreds(id: string): User;
  
}