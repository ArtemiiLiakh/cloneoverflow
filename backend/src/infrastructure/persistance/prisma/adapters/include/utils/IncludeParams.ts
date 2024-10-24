type PrismaIncludeParams<I = unknown> = undefined | boolean | { where: I }

export const IncludeParams = <I>(include: any, adapter: (include: any) => I): PrismaIncludeParams<I> => {
  if (!include) return false;

  return typeof include.answers === 'boolean' ? include.answers : {
    where: adapter(include),
  };
}