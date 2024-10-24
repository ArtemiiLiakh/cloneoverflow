import { Question, Tag } from "@prisma/client";

export type PrismaTagTypes = Tag & {
  questions?: Question[],
  _count?: {
    questions?: number,
  },
}