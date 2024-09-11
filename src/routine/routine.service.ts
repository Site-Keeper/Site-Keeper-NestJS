import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private routineRepository : Repository<Routine>
  ){}

  async create(createRoutineDto: CreateRoutineDto) {
    const newRoutine = this.routineRepository.create(createRoutineDto)
    return await this.routineRepository.save(newRoutine);
  }

  findAll() {
    return `This action returns all routine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} routine`;
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto ){
    return await this.routineRepository.update(id, updateRoutineDto);
  }

  remove(id: number) {
    return `This action removes a #${id} routine`;
  }
}
