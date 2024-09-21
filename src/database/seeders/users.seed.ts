import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/entities/role.entity';
import { perssonelType } from 'src/enums/perssonel-type.enum';

export default class CreateUsers implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const roleRepository = dataSource.getRepository(Role);

    const adminRole = await roleRepository.findOne({ where: { id: 1 } });
    const perssonelRole = await roleRepository.findOne({ where: { id: 2 } });
    const employedRole = await roleRepository.findOne({ where: { id: 3 } });

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
        name: 'Employed',
        doc_number: 1234560,
        password: bcrypt.hashSync('1234560', 10),
        email: 'employed@correo.com',
        role: employedRole,
        perssonelType: perssonelType.MAINTENANCE,
        created_by: 1,
        updated_by: 1,
      },
      {
        name: 'Employed2',
        doc_number: 1234561,
        password: bcrypt.hashSync('1234561', 10),
        email: 'employed2@correo.com',
        role: employedRole,
        perssonelType: perssonelType.SECURITY,
        created_by: 1,
        updated_by: 1,
      },
      {
        name: 'Employed3',
        doc_number: 1234562,
        password: bcrypt.hashSync('1234562', 10),
        email: 'employed3@correo.com',
        role: employedRole,
        perssonelType: perssonelType.JANITORIAL,
        created_by: 1,
        updated_by: 1,
      },
    ];

    for (const user of usersData) {
      const userExists = await userRepository.findOneBy({
        doc_number: user.doc_number,
      });

      if (!userExists) {
        console.log('añadiendo user:', user.name);
        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
      }
    }

    console.log('Users creados');
  }
}
