import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import CreateRoles from './role.seed';
import CreateTopics from './topic.seed';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const roleSeeders = new CreateRoles();
    await roleSeeders.run(this.dataSource);

    const topicSeeders = new CreateTopics();
    await topicSeeders.run(this.dataSource);
  }
}
