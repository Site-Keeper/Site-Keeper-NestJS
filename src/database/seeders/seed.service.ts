import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import CreateRoles from './roles.seed';
import CreateTopics from './topics.seed';
import CreateUsers from './users.seed';
import CreatePermissions from './permissions.seed';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const roleSeeders = new CreateRoles();
    await roleSeeders.run(this.dataSource);

    const topicSeeders = new CreateTopics();
    await topicSeeders.run(this.dataSource);

    const userSeeders = new CreateUsers();
    await userSeeders.run(this.dataSource);

    const permissionsSeeders = new CreatePermissions();
    await permissionsSeeders.run(this.dataSource);
  }
}
