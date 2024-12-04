import { prismaDatabase } from '@application/databases/PrismaDatabase';

export default prismaDatabase.getClient();