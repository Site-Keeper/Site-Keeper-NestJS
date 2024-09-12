import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';

export default class CreatePermissions implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const permissionRepository = dataSource.getRepository(Permission);
    const roleRepository = dataSource.getRepository(Role);

    const adminRole = await roleRepository.findOne({ where: { id: 1 } });
    const perssonelRole = await roleRepository.findOne({ where: { id: 2 } });
    const clientRole = await roleRepository.findOne({ where: { id: 3 } });

    const permissionsData = [
      // Permissions for routine
      {
        entity: 'routines',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: adminRole,
      },
      {
        entity: 'routines',
        can_create: false,
        can_read: true,
        can_update: false,
        can_delete: false,
        role: perssonelRole,
      },
      {
        entity: 'routines',
        can_create: false,
        can_read: false,
        can_update: false,
        can_delete: false,
        role: clientRole,
      },

      // Permissions for task
      {
        entity: 'tasks',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: adminRole,
      },
      {
        entity: 'tasks',
        can_create: false,
        can_read: true,
        can_update: true,
        can_delete: false,
        role: perssonelRole,
      },
      {
        entity: 'tasks',
        can_create: false,
        can_read: false,
        can_update: false,
        can_delete: false,
        role: clientRole,
      },

      // Permissions for report
      {
        entity: 'reports',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: adminRole,
      },
      {
        entity: 'reports',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: false,
        role: perssonelRole,
      },
      {
        entity: 'reports',
        can_create: true,
        can_read: true,
        can_update: false,
        can_delete: false,
        role: clientRole,
      },

      // Permissions for space
      {
        entity: 'spaces',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: adminRole,
      },
      {
        entity: 'spaces',
        can_create: false,
        can_read: true,
        can_update: false,
        can_delete: false,
        role: perssonelRole,
      },
      {
        entity: 'spaces',
        can_create: false,
        can_read: true,
        can_update: false,
        can_delete: false,
        role: clientRole,
      },

      // Permissions for object
      {
        entity: 'objects',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: adminRole,
      },
      {
        entity: 'objects',
        can_create: false,
        can_read: true,
        can_update: false,
        can_delete: false,
        role: perssonelRole,
      },
      {
        entity: 'objects',
        can_create: false,
        can_read: true,
        can_update: false,
        can_delete: false,
        role: clientRole,
      },

      // Permissions for lostObject
      {
        entity: 'lostObjects',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: adminRole,
      },
      {
        entity: 'lostObjects',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: false,
        role: perssonelRole,
      },
      {
        entity: 'lostObjects',
        can_create: true,
        can_read: true,
        can_update: false,
        can_delete: false,
        role: clientRole,
      },

      // Permissions for user
      {
        entity: 'users',
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
        role: adminRole,
      },
      {
        entity: 'users',
        can_create: false,
        can_read: true,
        can_update: true,
        can_delete: false,
        role: perssonelRole,
      },
      {
        entity: 'users',
        can_create: false,
        can_read: true,
        can_update: true,
        can_delete: false,
        role: clientRole,
      },
    ];

    for (const permission of permissionsData) {
      const permissionExists = await permissionRepository.findOneBy({
        entity: permission.entity,
        role: permission.role,
      });

      if (!permissionExists) {
        const newPermission = permissionRepository.create(permission);
        await permissionRepository.save(newPermission);
      }
    }

    console.log('Permissions creados');
  }
}
