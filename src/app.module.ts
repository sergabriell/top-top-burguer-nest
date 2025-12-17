import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersGroupModule } from './users-group/users-group.module';
import { UsersRoleModule } from './users-role/users-role.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, UsersGroupModule, UsersRoleModule, ConfigModule.forRoot(
    { isGlobal: true }
  ), DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
