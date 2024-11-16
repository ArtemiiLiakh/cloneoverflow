import { PrismaTransactionUnit } from '@infrastructure/persistance/prisma/repositories/PrismaTransactionUnit';
import PrismaDatabaseDI from '../database/PrismaDatabaseDI';

export default new PrismaTransactionUnit(PrismaDatabaseDI);