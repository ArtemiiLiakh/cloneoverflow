import { PaginatedData } from '../types/PaginatedData';
import { PaginationDTO } from '../dtos/pagination.dto';

export class DbUtils {
  static async paginate <Args=any, R=any>(repository: any, args: Args, { page, pageSize }: PaginationDTO): Promise<PaginatedData<R>> {
    page = page ?? 0;
    pageSize = pageSize ?? 10;

    const data = await repository.findMany({}, {
      ...args,
      take: pageSize,
      skip: page * pageSize,
    });
    const totalAmount = await repository.count((args as any).where);
    const totalPages = Math.ceil(totalAmount / pageSize);

    const prevElems = page ? pageSize : 0;
    let nextElems = totalAmount - (page + 1) * pageSize;

    nextElems = data.length < pageSize ? 0 : nextElems;
    nextElems = Math.min(nextElems, pageSize);

    return {
      data,
      pagination: {
        page,
        totalPages,
        totalAmount,
        nextElems: page >= totalPages ? 0 : nextElems,
        prevElems: page <= 0 ? 0 : prevElems,
      },
    };
  }
}