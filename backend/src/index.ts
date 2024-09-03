import app from "@/app";
import config from "@/config";
import { PrismaDatabase } from "@/databases/prisma";
import { RedisDatabase } from "@/databases/redis";
import { GoogleService } from "@/google/google.service";

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
