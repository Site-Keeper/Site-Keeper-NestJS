import { Module } from '@nestjs/common';
import { RoutineModule } from './routine/routine.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TaskModule } from './task/task.module';
import { PermissionModule } from './permission/permission.module';
import { ConfigModule } from '@nestjs/config';
import { TopicModule } from './topic/topic.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TaskModule,
    PermissionModule,
    RoleModule,
    RoutineModule,
    TopicModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
