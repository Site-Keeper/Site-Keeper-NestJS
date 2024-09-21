import { Module } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { RoutineController } from './routine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';
import { TaskModule } from 'src/task/task.module';
import { TaskService } from 'src/task/task.service';
import { JwtService } from '@nestjs/jwt';
import { Topic } from 'src/topic/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Routine, User, Topic]), TaskModule],
  controllers: [RoutineController],
  providers: [RoutineService, TaskService, JwtService],
})
export class RoutineModule {}
