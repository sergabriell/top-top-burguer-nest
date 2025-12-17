import { HttpException, HttpStatus } from '@nestjs/common';

export class RoleNotFoundException extends HttpException {
  constructor(id: number) {
    super(
      `A permissão (role) com o ID '${id}' não foi encontrada em nosso sistema.`,
      HttpStatus.NOT_FOUND,
    );
  }
}