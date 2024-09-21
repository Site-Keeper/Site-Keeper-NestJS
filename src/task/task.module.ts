import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from 'src/routine/entities/routine.entity';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Topic } from 'src/topic/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Routine, Topic, User])],
  controllers: [TaskController],
  providers: [TaskService, JwtService],
})
export class TaskModule {}
