import config from '@/config';
import { PaginationOptions } from '@cloneoverflow/common';
import { PaginatedData } from '@common/repository/pagination';

type WhereParam = { where: object };

export class PrismaPaginationRepository {
  static async paginate <P, R> (
    findMany: (args: P) => Promise<R[]>,
    count: (args: WhereParam) => Promise<number>,
    payload: P,
    pagination: PaginationOptions | undefined,
  ): Promise<PaginatedData<R>> {
    
    const page = pagination?.page ?? config.defaultPagination.page!;
    const pageSize = pagination?.pageSize ?? config.defaultPagination.pageSize!;
    
    const data = await findMany({
      ...payload,
      take: pageSize,
      skip: (page-1) * pageSize,
    });

    const totalAmount = await count({
      where: (payload as WhereParam).where,
    });
    const totalPages = Math.ceil(totalAmount / pageSize);
    const hasNext = totalPages > page;

    return {
      data,
      pagination: {
        page,
        pageSize,
        totalPages,
        totalAmount,
        hasNext,
      },
    };
  }
}