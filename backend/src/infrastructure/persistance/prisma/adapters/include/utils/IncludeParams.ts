type PrismaIncludeParams<I = unknown> = undefined | boolean | { where: I }

export const IncludeParams = <I>(include: object | boolean | undefined, adapter: (include: object) => I): PrismaIncludeParams<I> => {
  if (!include) return false;

  return typeof include === 'boolean' ? include : {
    where: adapter(include),
  };
};