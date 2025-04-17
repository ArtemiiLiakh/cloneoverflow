import config from '@/config';
import { PrismaClient } from '@prisma/client';

class PrismaDatabase {
  private client: PrismaClient;

  constructor () {
    this.client = new PrismaClient({
      datasourceUrl: config.POSTGRES_URL,
    });
  }

  async connect (): Promise<void> {
    await this.client.$connect();
  }

  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.$disconnect();
    }
  }

  getClient (): PrismaClient {
    return this.client;
  }
}

export const prismaDatabase = new PrismaDatabase();