import { Module } from '@nestjs/common';
import { RoutineModule } from './routine/routine.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TaskModule,
    RoutineModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
