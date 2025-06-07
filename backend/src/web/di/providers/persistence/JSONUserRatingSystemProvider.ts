import config from '@/config';
import { JSONUserRatingSystem } from '@infrastructure/persistence/userRatingSystem/JSONUserRatingSystem';
import { Provider } from '@nestjs/common';
import { UserRatingSystemDITokens } from '../../tokens/persistence';

export const JSONUserRatingSystemProvider: Provider = {
  provide: UserRatingSystemDITokens.JSONUserRatingSystemDIToken,
  useFactory: async () => {
    const ratingSystem = new JSONUserRatingSystem(config.ratingSystem.filepath);
    await ratingSystem.readFile();
    return ratingSystem;
  },
};