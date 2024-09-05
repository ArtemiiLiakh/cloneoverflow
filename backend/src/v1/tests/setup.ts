import config from "@/v1/config";
import { PrismaDatabase } from "@/v1/databases/prisma";
import { RedisDatabase } from "@/v1/databases/redis";
import { EmailService, forgotPasswordMessage, GoogleService } from "./mocks";

const redis = new RedisDatabase();
const prisma = new PrismaDatabase();

const tableNames = Object.getOwnPropertyNames(prisma).filter(
  (key) => key.at(0) !== '_' && key.at(0) !== '$'
);

jest.mock('@/google/google.service', () => ({
  GoogleService,
}));

jest.mock('@/google/email.service', () => ({
  EmailService,
}));

jest.mock('@/data/email/forgotPasswordMessage', () => ({
  forgotPasswordMessage
}))

beforeAll(async () => {
  await redis.connect(config.REDIS_URL);
});

afterEach(async () => {
  jest.useRealTimers();
  jest.clearAllMocks();

  await prisma.$transaction(
    tableNames.map(table => prisma[table]?.deleteMany()),
  );

  await redis.clearAll();
});

afterAll(async () => {
  await redis.disconnect();
  await prisma.$disconnect();
});