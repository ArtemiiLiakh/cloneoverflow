import config from '@/config';
import { PrismaClient } from '@prisma/client';

class PrismaDatabase {
  private client: PrismaClient;

  constructor () {
    this.client = new PrismaClient({
      datasourceUrl: config.POSTGRES_URL,
    });
  }

  async connect () {
    await this.client.$connect();
  }

  async disconnect () {
    if (this.client) {
      await this.client.$disconnect();
    }
  }

  getClient () {
    return this.client;
  }
}

export const prismaDatabase = new PrismaDatabase();