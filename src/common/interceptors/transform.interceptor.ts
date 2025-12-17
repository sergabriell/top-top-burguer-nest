import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const httpContext = context.switchToHttp();
        const res = httpContext.getResponse();
        const statusCode = res.statusCode;
        const totalItems = response.total || 0;
        const itemsPerPage = response.size || 10;
        const currentPage = response.page || 1;

        const isPaginated = response && response.data && typeof response.total !== 'undefined';

        if (isPaginated) {
          return {
            status: statusCode,
            message: 'Listagem realizada com sucesso',
            result: response.data,
            meta: {
              totalItems: totalItems,
              itemsPerPage: itemsPerPage,
              currentPage: Number(currentPage),
              totalPages: Math.ceil(totalItems / itemsPerPage),
            },
            timestamp: new Date().toISOString(),
          };
        }

        return {
          status: statusCode,
          message: 'Operação realizada com sucesso',
          result: response,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
