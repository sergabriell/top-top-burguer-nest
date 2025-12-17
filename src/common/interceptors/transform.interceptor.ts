import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<T>> {
    return next.handle().pipe(
      map((result) => {
        const response = context.switchToHttp().getResponse();
        
        const statusCode = response.statusCode || HttpStatus.OK;
        let message = 'Operação realizada com sucesso';
        
        if (statusCode === HttpStatus.CREATED) {
            message = 'Recurso criado com sucesso';
        }
        return new ApiResponseDto<T>(result, message, statusCode);
      }),
    );
  }
}