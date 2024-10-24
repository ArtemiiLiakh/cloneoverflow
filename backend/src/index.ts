import { prismaDatabase } from "@app/database/PrismaDatabase";
import { redisDatabase } from "@app/database/RedisDatabase";
import config from "./config";

const startupConnection = async () => {
  await prismaDatabase.connect();
  await redisDatabase.connect();
};

(async () => {
  await startupConnection();
  
  const { app } = await import("@/application/http-rest/server");

  app.listen(config.SERVER_PORT, async () => {
    console.log('Started on http://127.0.0.1:8000');
  });
})();
