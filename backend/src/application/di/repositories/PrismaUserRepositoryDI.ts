import { PrismaUserRepository } from "@infra/persistance/prisma/repositories/PrismaUserRepository";
import PrismaDatabaseDI from "../database/PrismaDatabaseDI";

export default new PrismaUserRepository(PrismaDatabaseDI);