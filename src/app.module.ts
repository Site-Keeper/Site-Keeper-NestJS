import { Module } from '@nestjs/common';
import { RoutineModule } from './routine/routine.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TaskModule } from './task/task.module';
import { PermissionModule } from './permission/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TopicModule } from './topic/topic.module';
import { User } from './user/entities/user.entity';
import { Task } from './task/entities/task.entity';
import { Role } from './role/entities/role.entity';
import { Routine } from './routine/entities/routine.entity';
import { Topic } from './topic/entities/topic.entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Topic, User, Task, Role, Routine],
        synchronize: true,
      }),
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
