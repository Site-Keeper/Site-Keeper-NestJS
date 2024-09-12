import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from 'src/routine/entities/routine.entity';
import { Topic } from 'src/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Routine, Topic])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
