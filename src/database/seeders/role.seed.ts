import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

export default class CreateRoles implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);

    const rolesData = [
      { name: 'admin' },
      { name: 'perssonel' },
      { name: 'client' },
    ];

    for (const role of rolesData) {
      const roleExists = await roleRepository.findOneBy({ name: role.name });

      if (!roleExists) {
        const newRole = roleRepository.create(role);
        await roleRepository.save(newRole);
      }
    }

    console.log('Roles creados');
  }
}
