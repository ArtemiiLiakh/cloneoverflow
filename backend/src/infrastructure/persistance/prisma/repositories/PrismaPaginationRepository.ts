import { PaginationDTO } from "@cloneoverflow/common";
import { PaginatedData } from "@common/utils/PaginatedData";

interface PaginatedRepository<P, R> {
  findMany(args: P): Promise<R[]>;
  count(args: any): Promise<number>;
}

interface PayloadOptions {
  where: any,
  include?: any,
  orderBy?: any,
  skip?: any,
  take?: any,
}

export class PrismaPaginationRepository {
  static async paginate <Payload extends PayloadOptions, Result>(
    repository: PaginatedRepository<Payload, Result>, 
    payload: Payload, 
    pagination: PaginationDTO | undefined,
  ): Promise<PaginatedData<Result>> {
    const page = pagination?.page ?? 0;
    const pageSize = pagination?.pageSize ?? 10;

    const data = await repository.findMany({
      ...payload,
      take: pageSize,
      skip: page * pageSize,
    });

    const totalAmount = await repository.count({
      where: payload.where,
    });
    const totalPages = totalAmount === pageSize ? 0 : Math.floor(totalAmount / pageSize);

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