export interface EmailService {
  sendEmail(to: string, body: string): Promise<void>;
}