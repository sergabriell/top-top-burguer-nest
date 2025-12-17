import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message = 'Erro no banco de dados';
    let statusCode = HttpStatus.BAD_REQUEST;

    if (exception.code === 'P2002') {
      const field = (exception.meta?.target as string[]) || 'campo';
      message = `Já existe um registro com este ${field}. (Erro de duplicidade)`;
    }

    response.status(statusCode).json({
      status: statusCode,
      message: message,
      result: null,
      timestamp: new Date(),
    });
  }
}
