import { SingletonDecorator } from "@/utils/decorators/SignletonDecorator";
import { PrismaClient } from "@prisma/client";

@SingletonDecorator
export class PrismaDatabase extends PrismaClient {}

