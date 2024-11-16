import { PrismaAnswerRepository } from '@infrastructure/persistance/prisma/repositories/PrismaAnswerRepository';
import PrismaDatabaseDI from '../database/PrismaDatabaseDI';

export default new PrismaAnswerRepository(PrismaDatabaseDI);