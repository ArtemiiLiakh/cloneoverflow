export interface EmailProvider {
  sendEmail(to: string, body: string): Promise<void>;
}