import { PrismaTagRepository } from "@infra/persistance/prisma/repositories/PrismaTagRepository";
import PrismaDatabaseDI from "../database/PrismaDatabaseDI";

export default new PrismaTagRepository(PrismaDatabaseDI);