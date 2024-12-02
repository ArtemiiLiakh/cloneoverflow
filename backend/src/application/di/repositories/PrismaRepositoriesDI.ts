import { PrismaAnswerRepository } from '@infrastructure/persistance/prisma/repositories/PrismaAnswerRepository';
import { PrismaQuestionRepository } from '@infrastructure/persistance/prisma/repositories/PrismaQuestionRepository';
import { PrismaTagRepository } from '@infrastructure/persistance/prisma/repositories/PrismaTagRepository';
import { PrismaTransactionUnit } from '@infrastructure/persistance/prisma/repositories/PrismaTransactionUnit';
import { PrismaUserRepository } from '@infrastructure/persistance/prisma/repositories/PrismaUserRepository';
import PrismaDatabaseDI from '../database/PrismaDatabaseDI';

export const PrismaAnswerRepositoryDI = new PrismaAnswerRepository(PrismaDatabaseDI);
export const PrismaQuestionRepositoryDI = new PrismaQuestionRepository(PrismaDatabaseDI);
export const PrismaUserRepositoryDI = new PrismaUserRepository(PrismaDatabaseDI);
export const PrismaTagRepositoryDI = new PrismaTagRepository(PrismaDatabaseDI);
export const PrismaTransactionDI = new PrismaTransactionUnit(PrismaDatabaseDI);