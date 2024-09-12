import { Module } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { RoutineController } from './routine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Routine, User])],
  controllers: [RoutineController],
  providers: [RoutineService],
})
export class RoutineModule {}
