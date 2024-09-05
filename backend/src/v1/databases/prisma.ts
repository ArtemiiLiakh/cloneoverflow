import { SingletonDecorator } from "@/v1/utils/decorators/SignletonDecorator";
import { PrismaClient } from "@prisma/client";

@SingletonDecorator
export class PrismaDatabase extends PrismaClient {}

