import { PrismaQuestionRepository } from '@infrastructure/persistance/prisma/repositories/PrismaQuestionRepository';
import PrismaDatabaseDI from '../database/PrismaDatabaseDI';

export default new PrismaQuestionRepository(PrismaDatabaseDI);