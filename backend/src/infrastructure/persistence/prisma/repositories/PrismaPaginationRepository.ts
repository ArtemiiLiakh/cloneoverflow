import config from '@/config';
import { PaginationDTO, PaginatedData } from '@cloneoverflow/common';

type WhereParam = { where: object };

export class PrismaPaginationRepository {
  static async paginate <P, R> (
    findMany: (args: P) => Promise<R[]>,
    count: (args: WhereParam) => Promise<number>,
    payload: P,
    pagination: PaginationDTO | undefined,
  ): Promise<PaginatedData<R>> {
    const page = pagination?.page ?? config.defaultPagination.page!;
    const pageSize = pagination?.pageSize ?? config.defaultPagination.pageSize!;

    const data = await findMany({
      ...payload,
      take: pageSize,
      skip: page * pageSize,
    });

    const totalAmount = await count({
      where: (payload as WhereParam).where,
    });
    const totalPages = totalAmount <= pageSize ? 0 : Math.floor(totalAmount / pageSize);

    const prevElems = page ? pageSize : 0;
    let nextElems = totalAmount - (page + 1) * pageSize;

    nextElems = data.length < pageSize ? 0 : nextElems;
    nextElems = Math.min(nextElems, pageSize);
    
    return {
      data,
      pagination: {
        page,
        pageSize,
        totalPages,
        totalAmount,
        nextElems: page >= totalPages ? 0 : nextElems,
        prevElems: page <= 0 ? 0 : prevElems,
      },
    };
  }
}