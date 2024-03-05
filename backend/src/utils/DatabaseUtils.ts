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
    const totalPages = Math.ceil(totalAmount / pageSize)-1;

    return {
      data,
      pagination: {
        page,
        totalPages,
        totalAmount,
      },
    };
  }
}