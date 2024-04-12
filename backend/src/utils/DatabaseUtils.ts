import { PaginationDTO } from '@cloneoverflow/common';
import { PaginatedData } from '../types/PaginatedData';

export class DbUtils {
  static async paginate <Args=any, R=any>(repository: any, args: Args, pagination?: PaginationDTO): Promise<PaginatedData<R>> {
    const page = pagination?.page ?? 0;
    const pageSize = pagination?.pageSize ?? 10;

    const data = await repository.findMany({}, {
      ...args,
      take: pageSize,
      skip: page * pageSize,
    });
    const totalAmount = await repository.count((args as any).where);
    const totalPages = Math.floor(totalAmount / pageSize);

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