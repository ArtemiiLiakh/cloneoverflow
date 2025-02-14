import { JSONUserRatingSystemDI } from '@application/di/security/ratingSystem/JSONUserRatingSystemDI';
import { EmailProvider } from '@application/interfaces/email/EmailProvider';

(async () => {
  jest.mock('@application/di/email/GoogleEmailProviderDI', () => ({
    GoogleEmailProviderDI: {
      sendEmail: jest.fn(),
    } as EmailProvider,
  }));

  await JSONUserRatingSystemDI.readFile();
})();