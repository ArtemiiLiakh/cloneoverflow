import { PrismaUserRepository } from '@infrastructure/persistance/prisma/repositories/PrismaUserRepository';
import PrismaDatabaseDI from '../database/PrismaDatabaseDI';

export default new PrismaUserRepository(PrismaDatabaseDI);