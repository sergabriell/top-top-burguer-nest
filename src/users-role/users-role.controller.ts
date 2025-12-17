import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsersRoleService } from './users-role.service';
import { FilterRoleDto } from 'src/common/dto/users/input/filter-role.dto';

@Controller('users-role')
export class UsersRoleController {
    constructor(private readonly usersRoleService: UsersRoleService) {}

    @Get()
    async getAllRoles(@Query() query: FilterRoleDto) {
        return this.usersRoleService.getAllRoles(query);
    }

    @Get(':id')
    async getRoleById(@Param('id', ParseIntPipe) id: number) {
        return this.usersRoleService.getRoleById(id);
    }

    @Post()
    async createRole(@Body() { name, label }: { name: string; label: string }) {
        try {
            return this.usersRoleService.createRole(name, label);
        } catch (error) {
            throw error;
        }
    }

    @Put(':id')
    async updateRole(@Param('id', ParseIntPipe) id: number, @Body() { name, label }: { name: string; label: string }) {
        return this.usersRoleService.updateRole(id, name, label);
    }
}
