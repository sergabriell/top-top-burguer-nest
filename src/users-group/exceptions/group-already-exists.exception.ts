import { HttpException, HttpStatus } from '@nestjs/common';

export class GroupAlreadyExistsException extends HttpException {
  constructor(groupName: string) {
    super(`O grupo com o nome '${groupName}' já existe em nosso sistema.`, HttpStatus.CONFLICT);
  }
}
