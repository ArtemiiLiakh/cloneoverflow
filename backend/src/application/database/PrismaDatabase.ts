import config from "@/config";
import { PrismaClient } from "@prisma/client";

class PrismaDatabase {
  private client: PrismaClient;

  async connect() {
    this.client = new PrismaClient({
      datasourceUrl: config.POSTGRES_URL,
    });

    await this.client.$connect();
  }

  getClient() {
    return this.client;
  }
}

export const prismaDatabase = new PrismaDatabase();