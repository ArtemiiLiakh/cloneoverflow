import app from "@/v1/app";
import config from "@/v1/config";
import { PrismaDatabase } from "@/v1/databases/prisma";
import { RedisDatabase } from "@/v1/databases/redis";
import { GoogleService } from "@/v1/services/google/google.service";

const startupConnection = async () => {
  new PrismaDatabase();
  new GoogleService(); 
  await new RedisDatabase().connect(config.REDIS_URL);
};

(async () => {
  await startupConnection();
  app.listen(config.SERVER_PORT, async () => {
    console.log('Started on http://127.0.0.1:8000');
  });
})();
