import { Module } from '@nestjs/common';
import { RoutineModule } from './routine/routine.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TaskModule } from './task/task.module';
import { PermissionModule } from './permission/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModule } from './topic/topic.module';
import { User } from './user/entities/user.entity';
import { Task } from './task/entities/task.entity';
import { Role } from './role/entities/role.entity';
import { Routine } from './routine/entities/routine.entity';
import { Topic } from './topic/entities/topic.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: "postgres://default:OtT6UKE3WxPd@ep-muddy-sky-a4fvwgnu-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
      entities: [Topic,User, Task, Role, Routine],
      synchronize: true,
    }),
    UserModule,
    TaskModule,
    PermissionModule,
    RoleModule,
    RoutineModule,
    TopicModule,
  ],
})
export class AppModule {}
