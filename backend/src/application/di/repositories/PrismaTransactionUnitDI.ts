import { PrismaTransactionUnit } from "@infra/persistance/prisma/repositories/PrismaTransactionUnit";
import PrismaDatabaseDI from "../database/PrismaDatabaseDI";

export default new PrismaTransactionUnit(PrismaDatabaseDI);