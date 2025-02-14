import { prismaDatabase } from '@application/databases/PrismaDatabase';

export const PrismaDatabaseDI = prismaDatabase.getClient();