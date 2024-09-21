import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicService {

  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>
  ) {}

  async findAll() {
    return await this.topicRepository.find();
  }

  async findOne(id: number) {
    return await this.topicRepository.findOne({where : {id}});
  }
}
