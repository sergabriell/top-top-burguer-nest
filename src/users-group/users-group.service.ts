import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { FilterGroupDto } from 'src/common/dto/users/input/filter-group.dto';
import { QueryBuilder } from 'src/common/utils/query-builder.util';
import { DbService } from 'src/db/db.service';
import { GroupNotFoundException } from './exceptions/group-not-found.exception';
import { GroupAlreadyExistsException } from './exceptions/group-already-exists.exception';
import { RoleNotFoundException } from 'src/users-role/exceptions/role-not-found.exception';
import { CreateUserGroupDto } from 'src/common/dto/users/input/create-user-group.dto';
import { UpdateUserGroupDto } from 'src/common/dto/users/input/update-user-group.dto';

@Injectable()
export class UsersGroupService {
  constructor(private readonly dbService: DbService) {}

  async getAllGroups(query?: FilterGroupDto) {
    try {
      const { skip, take, page, size } = QueryBuilder.formatPagination(query);

      const orderBy = QueryBuilder.formatOrder(query?.sort || '', [
        'id',
        'name',
        'admin',
        'status',
        'createdAt',
      ]);

      const where: Prisma.UserGroupWhereInput = {
        ...(query?.name && { name: { contains: query.name, mode: 'insensitive' } }),
        ...(query?.id && { id: Number(query.id) }),
        ...(query?.admin !== undefined && { admin: Boolean(query.admin) }),
        ...(query?.status !== undefined && { status: Boolean(query.status) }),
      };

      const [data, total] = await Promise.all([
        this.dbService.userGroup.findMany({
          where,
          skip,
          take,
          orderBy,
          include: { roles: { select: { name: true } } },
        }),
        this.dbService.userGroup.count({ where }),
      ]);

      return { data, total, page, size };
    } catch (error) {
      throw error;
    }
  }

  async getGroupById(id: number) {
    try {
      const result = await this.dbService.userGroup.findUnique({
        where: { id },
        include: { roles: { select: { name: true } } },
      });
      if (!result) {
        throw new GroupNotFoundException(id);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createGroup({ name, observation, admin, status, roleIds }: CreateUserGroupDto) {
    try {
      const existingGroup = await this.findGroupByName(name);

      if (existingGroup) {
        throw new GroupAlreadyExistsException(name);
      }

      const roles = await this.dbService.userRole.findMany({
        where: {
          id: { in: roleIds },
        },
        select: { id: true },
      });

      if (roles.length !== roleIds.length) {
        const foundIds = roles.map((r) => r.id);
        const missingRoles = roleIds.filter((id) => !foundIds.includes(id));

        throw new RoleNotFoundException(missingRoles[0]);
      }

      return await this.dbService.userGroup.create({
        data: {
          name,
          admin,
          observation,
          status,
          roles: { connect: roleIds.map((id) => ({ id })) },
        },
        include: {
          roles: {
            select: {
              name: true,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateGroup(id: number, { name, observation, admin, status, roleIds }: UpdateUserGroupDto) {
    await this.getGroupById(id);

    if (roleIds) {
      const roles = await this.dbService.userRole.findMany({
        where: {
          id: { in: roleIds },
        },
        select: { id: true },
      });

      if (roles.length !== roleIds.length) {
        const foundIds = roles.map((r) => r.id);
        const missingRoles = roleIds.filter((id) => !foundIds.includes(id));

        throw new RoleNotFoundException(missingRoles[0]);
      }
    }

    return this.dbService.userGroup.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(observation !== undefined && { observation }),
        ...(admin !== undefined && { admin }),
        ...(status !== undefined && { status }),
        ...(roleIds && {
          roles: {
            set: roleIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        roles: {
          select: { name: true },
        },
      },
    });
  }

  async deleteGroup(id: number) {
    try {
      const existingGroup = await this.getGroupById(id);
      if (!existingGroup) {
        throw new GroupNotFoundException(id);
      }

      return this.dbService.userGroup.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async findGroupByName(name: string) {
    try {
      return this.dbService.userGroup.findUnique({
        where: { name },
      });
    } catch (error) {
      throw error;
    }
  }
}
