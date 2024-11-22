import { prismaDatabase } from '@application/database/PrismaDatabase';

export default prismaDatabase.getClient();