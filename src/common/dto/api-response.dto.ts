import { HttpStatus } from '@nestjs/common';

export class ApiResponseDto<T> {
  status: number;
  message: string;
  result: T | T[] | null;
  meta?: any;
  timestamp: Date = new Date();

  constructor(
    result: T | T[] | null,
    message: string = 'Success',
    statusCode: number = HttpStatus.OK,
    meta?: any,
  ) {
    this.result = result;
    this.message = message;
    this.status = statusCode;
    this.meta = meta;
    this.timestamp = new Date().toISOString() as unknown as Date;
  }
}