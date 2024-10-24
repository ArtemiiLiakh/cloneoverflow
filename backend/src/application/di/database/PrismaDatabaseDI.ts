import { prismaDatabase } from "@app/database/PrismaDatabase";

export default prismaDatabase.getClient();