import { Prisma } from 'generated/prisma/client';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export class QueryBuilder {
  static formatPagination(query: any) {
    const page = Math.max(Number(query.page) || 1, 1);
    const size = Math.max(Number(query.size) || 10, 1);
    const skip = (page - 1) * size;

    return { skip, take: size, page, size };
  }

  static formatOrder(sort: string | undefined, allowedFields: string[]) {
    const defaultOrder = { id: 'asc' as Prisma.SortOrder };

    if (!sort) return defaultOrder;

    const [field, direction] = sort.split(',');

    const order: Prisma.SortOrder = direction?.toLowerCase() === 'desc' ? 'desc' : 'asc';

    if (allowedFields.includes(field)) {
      return { [field]: order };
    }

    return defaultOrder;
  }
}
