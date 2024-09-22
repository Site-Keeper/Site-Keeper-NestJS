import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Task } from 'src/task/entities/task.entity';
import { Routine } from 'src/routine/entities/routine.entity';
import { RoutineModule } from 'src/routine/routine.module';
import { TaskModule } from 'src/task/task.module';
import { RoutineService } from 'src/routine/routine.service';
import { TaskService } from 'src/task/task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Routine, Task, Topic]),
    UserModule, RoutineModule, TaskModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, RoutineService, TaskService],
})
export class AuthModule {}
