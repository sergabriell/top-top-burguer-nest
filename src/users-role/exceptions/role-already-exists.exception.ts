import { HttpException, HttpStatus } from '@nestjs/common';

export class RoleAlreadyExistsException extends HttpException {
  constructor(roleName: string) {
    super(
      `A permissão (role) com o nome '${roleName}' já existe em nosso sistema.`,
      HttpStatus.CONFLICT,
    );
  }
}
