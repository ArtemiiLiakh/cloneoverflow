import { SingletonDecorator } from "@/utils/decorators/SignletonDecorator";

@SingletonDecorator
export class EmailService {
  sendEmail = jest.fn();
}

@SingletonDecorator
export class GoogleService {
  email = new EmailService();
}

export const forgotPasswordMessage = jest.fn().mockImplementation((code: string) => code); 