import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const usersData = [
      {
        name: 'Admin',
        doc_number: 123456,
        password: bcrypt.hashSync('123456', 10),
        email: 'admin@correo.com',
        role_id: 1,
        created_by: 1,
        updated_by: 1,
      },
      {
        name: 'Perssonel',
        doc_number: 654321,
        password: bcrypt.hashSync('654321', 10),
        email: 'perssonel@correo.com',
        role_id: 2,
        created_by: 1,
        updated_by: 1,
      },
      {
        name: 'Client',
        doc_number: 1234560,
        password: bcrypt.hashSync('1234560', 10),
        email: 'clien@correo.com',
        role_id: 3,
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
