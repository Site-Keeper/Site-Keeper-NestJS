import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Injectable()
export class RoutineService {
  create(createRoutineDto: CreateRoutineDto) {
    return 'This action adds a new routine';
  }

  findAll() {
    return `This action returns all routine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} routine`;
  }

  update(id: number, updateRoutineDto: UpdateRoutineDto) {
    return `This action updates a #${id} routine`;
  }

  remove(id: number) {
    return `This action removes a #${id} routine`;
  }
}
