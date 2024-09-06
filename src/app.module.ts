import { Module } from '@nestjs/common';
import { RoutineModule } from './routine/routine.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TaskModule } from './task/task.module';
import { PermissionModule } from './permission/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Rlwl2023.",
      database: "ecommercer",
      entities: [],
      synchronize: true
    }),
    UserModule,
    TaskModule,
    PermissionModule,
    RoleModule,
    RoutineModule],
})

export class AppModule {}
