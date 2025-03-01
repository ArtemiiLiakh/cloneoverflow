import { JSONUserRatingSystem } from '@infrastructure/persistence/userRatingSystem/JSONUserRatingSystem';

export const UserRatingSystemDITokens = {
  JSONUserRatingSystemDIToken: Symbol(JSONUserRatingSystem.name),
};