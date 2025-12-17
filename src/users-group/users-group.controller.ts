import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersGroupService } from './users-group.service';
import { FilterGroupDto } from 'src/common/dto/users/input/filter-group.dto';
import { CreateUserGroupDto } from 'src/common/dto/users/input/create-user-group.dto';

@Controller('users-group')
export class UsersGroupController {
  constructor(private readonly usersGroupService: UsersGroupService) {}

  @Get()
  async getAllGroups(@Query() query: FilterGroupDto) {
    return this.usersGroupService.getAllGroups(query);
  }

  @Get(':id')
  async getGroupById(@Param('id', ParseIntPipe) id: number) {
    return this.usersGroupService.getGroupById(id);
  }

  @Post()
  async createGroup(@Body() dto: CreateUserGroupDto) {
    return this.usersGroupService.createGroup(dto);
  }

  @Put(':id')
  async updateGroup(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateUserGroupDto) {
    return this.usersGroupService.updateGroup(id, dto);
  }

  @Delete(':id')
  async deleteGroup(@Param('id', ParseIntPipe) id: number) {
    return this.usersGroupService.deleteGroup(id);
  }
}
