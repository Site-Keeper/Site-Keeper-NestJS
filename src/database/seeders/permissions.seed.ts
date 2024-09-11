import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';

export default class CreatePermissions implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const permissionRepository = dataSource.getRepository(Permission);

    const permissionsData = [
      // Permissions for routine
      {
        entity: 'routines',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role_id: 1,
      },
      {
        entity: 'routines',
        can_create: false,
        can_read: true,
        can_update: false,
        can_delete: false,
        role_id: 2,
      },
      {
        entity: 'routines',
        can_create: false,
        can_read: false,
        can_update: false,
        can_delete: false,
        role_id: 3,
      },

      // Permissions for task
      {
        entity: 'tasks',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role_id: 1,
      },
      {
        entity: 'tasks',
        can_create: false,
        can_read: true,
        can_update: true,
        can_delete: false,
        role_id: 2,
      },
      {
        entity: 'tasks',
        can_create: false,
        can_read: false,
        can_update: false,
        can_delete: false,
        role_id: 3,
      },

      // Permissions for report
      {
        entity: 'reports',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role_id: 1,
      },
      {
        entity: 'reports',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: false,
        role_id: 2,
      },
      {
        entity: 'reports',
        can_create: true,
        can_read: true,
        can_update: false,
        can_delete: false,
        role_id: 3,
      },

      // Permissions for space
      {
        entity: 'spaces',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role_id: 1,
      },
      {
        entity: 'spaces',
        can_create: false,
        can_read: true,
        can_update: false,
        can_delete: false,
        role_id: 2,
      },
      {
        entity: 'spaces',
        can_create: false,
        can_read: true,
        can_update: false,
        can_delete: false,
        role_id: 3,
      },

      // Permissions for object
      {
        entity: 'objects',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role_id: 1,
      },
      {
        entity: 'objects',
        can_create: false,
        can_read: true,
        can_update: false,
        can_delete: false,
        role_id: 2,
      },
      {
        entity: 'objects',
        can_create: false,
        can_read: true,
        can_update: false,
        can_delete: false,
        role_id: 3,
      },

      // Permissions for lostObject
      {
        entity: 'lostObjects',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role_id: 1,
      },
      {
        entity: 'lostObjects',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: false,
        role_id: 2,
      },
      {
        entity: 'lostObjects',
        can_create: true,
        can_read: true,
        can_update: false,
        can_delete: false,
        role_id: 3,
      },

      // Permissions for user
      {
        entity: 'users',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role_id: 1,
      },
      {
        entity: 'users',
        can_create: false,
        can_read: true,
        can_update: true,
        can_delete: false,
        role_id: 2,
      },
      {
        entity: 'users',
        can_create: false,
        can_read: true,
        can_update: true,
        can_delete: false,
        role_id: 3,
      },
    ];

    for (const permission of permissionsData) {
      const permissionExists = await permissionRepository.findOneBy({
        entity: permission.entity,
        role_id: permission.role_id,
      });

      if (!permissionExists) {
        const newPermission = permissionRepository.create(permission);
        await permissionRepository.save(newPermission);
      }
    }

    console.log('Permissions creados');
  }
}
