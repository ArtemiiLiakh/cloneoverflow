import { PrismaAnswerRepository } from "@infra/persistance/prisma/repositories/PrismaAnswerRepository";
import PrismaDatabaseDI from "../database/PrismaDatabaseDI";

export default new PrismaAnswerRepository(PrismaDatabaseDI);