import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RoleAlreadyExistsException } from './exceptions/role-already-exists.exception';
import { RoleNotFoundException } from './exceptions/role-not-found.exception';
import { FilterRoleDto } from 'src/common/dto/users/input/filter-role.dto';
import { Prisma } from 'generated/prisma/client';
import { QueryBuilder } from 'src/common/utils/query-builder.util';

@Injectable()
export class UsersRoleService {
    constructor(private readonly dbService: DbService) {}

    async getAllRoles(query?: FilterRoleDto) {
        try {
            const { skip, take, page, size } = QueryBuilder.formatPagination(query);

            const orderBy = QueryBuilder.formatOrder(query?.sort || '', ['id', 'name', 'createdAt']);

            const where: Prisma.UserRoleWhereInput = {
                ...(query?.name && { name: { contains: query.name, mode: 'insensitive' } }),
                ...(query?.id && { id: Number(query.id) }),
            };

            const [data, total] = await Promise.all([
                this.dbService.userRole.findMany({
                    where,
                    skip,
                    take,
                    orderBy,
                }),
                this.dbService.userRole.count({ where }),
            ]);

            return { data, total, page, size };
        } catch (error) {
            throw error;
        }
    }

    async getRoleById(id: number) {
        try {
            const result = await this.dbService.userRole.findUnique({
                where: { id },
            });
            if (!result) {
                throw new RoleNotFoundException(id);
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async createRole(name: string, label: string) {
        try {
            const existingRole = await this.findRoleByName(name);

            if (existingRole) {
                throw new RoleAlreadyExistsException(name);
            }

            return await this.dbService.userRole.create({
                data: { name, label },
            });
        } catch (error) {
            throw error;
        }
    }

    async updateRole(id: number, name: string, label: string) {
        try {
            const existingRole = await this.findRoleByName(name);

            if (existingRole && existingRole.id !== id) {
                throw new RoleAlreadyExistsException(name);
            }

            return await this.dbService.userRole.update({
                where: { id },
                data: { name, label },
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteRole(id: number) {
        try {
            return this.dbService.userRole.delete({
                where: { id },
            });
        } catch (error) {
            throw error;
        }
    }

    async findRoleByName(name: string) {
        try {
            return this.dbService.userRole.findUnique({
                where: { name },
            });
        } catch (error) {
            throw error;
        }
    }
}
