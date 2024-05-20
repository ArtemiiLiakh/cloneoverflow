import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { DbTag } from "../types/database/DbTag";

export class TagsRepository {
  private include: Prisma.TagInclude = {
    _count: true,
  }

  constructor (
    private prisma = new PrismaClient(),
  ) {}

  findMany<R=DbTag> (where: Prisma.TagWhereInput, args?: Prisma.TagFindManyArgs) {
    return this.prisma.tag.findMany({
      where,
      include: this.include,
      ...args,
    }) as unknown as PrismaPromise<R[]>;
  }

  count (where: Prisma.TagWhereInput) {
    return this.prisma.tag.count({ where });
  }
}