import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/entities/role.entity';
import { RoutineService } from 'src/routine/routine.service';
import { RoutineModule } from 'src/routine/routine.module';
import { Routine } from 'src/routine/entities/routine.entity';
import { Task } from 'src/task/entities/task.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { TaskService } from 'src/task/task.service';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Routine, Task, Topic]),
    RoutineModule,
    TaskModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, RoutineService, TaskService],
})
export class UserModule {}
