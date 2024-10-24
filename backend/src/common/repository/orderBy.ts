import { OrderBy } from "@cloneoverflow/common";

export type OrderByOption<O> = Partial<Record<keyof O, OrderBy>>;