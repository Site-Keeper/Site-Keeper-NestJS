import { Controller, Get, Param } from '@nestjs/common';
import { TopicService } from './topic.service';
import {
  ApiDocGelAllTopic,
  ApiDocGelByIdTopic,
} from './docs/topic.swager.decorator';
import { Topic } from './entities/topic.entity';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiDocGelAllTopic(Topic)
  @Get()
  findAll() {
    return this.topicService.findAll();
  }

  @ApiDocGelByIdTopic(Topic)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(+id);
  }
}
