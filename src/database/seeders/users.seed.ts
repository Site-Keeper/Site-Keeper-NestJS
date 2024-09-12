import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/entities/role.entity';

export default class CreateUsers implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const roleRepository = dataSource.getRepository(Role);

    const adminRole = await roleRepository.findOne({ where: { id: 1 } });
    const perssonelRole = await roleRepository.findOne({ where: { id: 2 } });
    const clientRole = await roleRepository.findOne({ where: { id: 3 } });

    const usersData = [
      {
        name: 'Admin',
        doc_number: 123456,
        password: bcrypt.hashSync('123456', 10),
        email: 'admin@correo.com',
        role: adminRole,
        created_by: 1,
        updated_by: 1,
      },
      {
        name: 'Perssonel',
        doc_number: 654321,
        password: bcrypt.hashSync('654321', 10),
        email: 'perssonel@correo.com',
        role: perssonelRole,
        created_by: 1,
        updated_by: 1,
      },
      {
        name: 'Client',
        doc_number: 1234560,
        password: bcrypt.hashSync('1234560', 10),
        email: 'clien@correo.com',
        role: clientRole,
        created_by: 1,
        updated_by: 1,
      },
    ];

    for (const user of usersData) {
      const userExists = await userRepository.findOneBy({ name: user.name });

      if (!userExists) {
        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
      }
    }

    console.log('Users creados');
  }
}
