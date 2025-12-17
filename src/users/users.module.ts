import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { UsersService } from './users.service';
import { DbService } from 'src/db/db.service';

@Module({
  imports: [DbModule],
  providers: [UsersService],
})
export class UsersModule {
  constructor(private readonly dbService: DbService) {}

  async getAllUsers() {
    return this.dbService.user.findMany();
  }
}
