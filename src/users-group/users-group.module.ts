import { Module } from '@nestjs/common';
import { UsersGroupService } from './users-group.service';
import { DbModule } from 'src/db/db.module';
import { UsersGroupController } from './users-group.controller';

@Module({
  providers: [UsersGroupService],
  imports: [DbModule],
  controllers: [UsersGroupController],
})
export class UsersGroupModule {}
