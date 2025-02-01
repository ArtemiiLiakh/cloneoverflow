import { PrismaUserRepositoryDI } from '@application/di/repositories/PrismaRepositoriesDI';
import { UserRatingValidator } from '@core/services/validators';
import { JSONUserRatingSystemDI } from '../ratingSystem/JSONUserRatingSystemDI';

export const UserRatingValidatorDI = new UserRatingValidator(JSONUserRatingSystemDI, PrismaUserRepositoryDI);