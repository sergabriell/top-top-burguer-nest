import { HttpException, HttpStatus } from '@nestjs/common';

export class GroupNotFoundException extends HttpException {
  constructor(id: number) {
    super(`O grupo com o ID '${id}' não foi encontrado em nosso sistema.`, HttpStatus.NOT_FOUND);
  }
}
