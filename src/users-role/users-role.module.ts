import { Module } from '@nestjs/common';
import { UsersRoleService } from './users-role.service';
import { DbModule } from 'src/db/db.module';
import { UsersRoleController } from './users-role.controller';

@Module({
  providers: [UsersRoleService],
  imports: [DbModule],
  controllers: [UsersRoleController],
})
export class UsersRoleModule {}
