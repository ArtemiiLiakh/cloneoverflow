import { JSONUserRatingSystem } from '@infrastructure/ratingSystem/userRatingSystem/JSONUserRatingSystem';
import path from 'path';

export const JSONUserRatingSystemDI = new JSONUserRatingSystem(path.join(process.cwd(), 'environment', 'ratings.json'));