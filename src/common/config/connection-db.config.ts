import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Routine } from 'src/routine/entities/routine.entity';
import { Task } from 'src/task/entities/task.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get<string>('DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: true,
      entities: [Topic, User, Task, Role, Routine],
    };
  }
}
