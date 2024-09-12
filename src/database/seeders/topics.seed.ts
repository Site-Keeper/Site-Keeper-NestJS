import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Topic } from '../../entities/topic.entity';

export default class CreateTopics implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const topicRepository = dataSource.getRepository(Topic);

    const topicsData = [
      { name: 'Maintenance', icon: 'EngineeringIcon' },
      { name: 'Janitorial', icon: 'CleanHandsIcon' },
      { name: 'Security', icon: 'AdminPanelSettingsIcon' },
      { name: 'Other', icon: 'MoreHorizIcon' },
    ];

    for (const topic of topicsData) {
      const topicExists = await topicRepository.findOneBy({ name: topic.name });

      if (!topicExists) {
        const newTopic = topicRepository.create(topic);
        await topicRepository.save(newTopic);
      }
    }

    console.log('Topics creados');
  }
}
