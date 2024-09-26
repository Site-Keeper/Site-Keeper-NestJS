import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TaskService } from 'src/task/task.service';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import axios, { AxiosRequestConfig } from 'axios';
import { ISpace } from 'src/common/interfaces/spaces.interface';

@Injectable()
export class RoutineService {
  private readonly javaServiceUrl =
    'https://site-keeper-springboot.onrender.com/api/spaces';

  constructor(
    @InjectRepository(Routine)
    private routineRepository: Repository<Routine>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private taskService: TaskService
  ) {}

  async create(createRoutineDto: CreateRoutineDto, userReq: UserJWT) {
    const user = await this.userRepository.findOne({
      where: { id: createRoutineDto.assigned_to, is_deleted: false },
    });
    const newRoutine = {
      name: createRoutineDto.name,
      start_time: createRoutineDto.start_time,
      end_time: createRoutineDto.end_time,
      days: createRoutineDto.days,
      assigned_to: user,
      is_deleted: false,
      created_by: userReq.id,
      updated_by: userReq.id,
    };
    const routinesByUser = await this.routineRepository.find({
      where: { is_deleted: false, assigned_to: { id: user.id } },
    });
    routinesByUser.forEach((routineDays) => {
      const days = routineDays.days;
      days.forEach((day) => {
        if (createRoutineDto.days.includes(day)) {
          throw new BadRequestException(
            'The user already has a routine scheduled for this day'
          );
        }
      });
    });
    await this.routineRepository.save(newRoutine);
    delete newRoutine.assigned_to;
    return {
      statusCode: 201,
      message: 'routine created successfully',
      data: {
        responseRoutine: { ...newRoutine, assigned_to: user.id },
      },
    };
  }

  async findAll() {
    const routines = await this.routineRepository.find({
      where: { is_deleted: false },
      relations: { assigned_to: true, tasks: true },
    });
    const routineRespos = routines.map((routine) => {
      const name = routine.assigned_to.name;
      delete routine.assigned_to;
      return { ...routine, assigned_to: name };
    });
    return routineRespos;
  }

  async findByUser(id: number) {
    const routines = await this.routineRepository.find({
      where: { is_deleted: false, assigned_to: { id } },
      relations: ['assigned_to', 'tasks'],
    });
    return routines;
  }

  async findRoutinesForToday(id: number, token: string) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const today = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(new Date());

    const routines = await this.routineRepository.find({
      where: { is_deleted: false, assigned_to: { id } },
      relations: ['assigned_to', 'tasks'],
    });

    const todayRoutines = routines.find((routine) =>
      routine.days.includes(today)
    );

    if (!todayRoutines) {
      return { todayRoutines: null };
    }

    const spacesResponse = await axios.get(`${this.javaServiceUrl}`, config);
    const spacesMap = spacesResponse.data.reduce(
      (acc: Record<number, ISpace>, space: ISpace) => {
        acc[space.id] = {
          id: space.id,
          name: space.name,
          location: space.location,
        };
        return acc;
      },
      {}
    );

    const tasksWithSpaces = todayRoutines.tasks.map((task) => {
      const space = spacesMap[task.space_id];
      return {
        ...task,
        space: space || null,
      };
    });

    return { todayRoutines: { ...todayRoutines, tasks: tasksWithSpaces } };
  }

  async findOne(id: number) {
    const routine = await this.routineRepository.findOne({
      where: { id, is_deleted: false },
      relations: ['assigned_to'],
    });
    return routine;
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto, user: UserJWT) {
    const routine = await this.routineRepository.findOne({ where: { id } });
    const updateTask = { ...updateRoutineDto, updated_by: user.id };
    Object.assign(routine, updateTask);
    return await this.routineRepository.save(routine);
  }

  async remove(id: number, user: UserJWT, token: string) {
    await this.routineRepository.update(id, {
      updated_by: user.id,
      is_deleted: true,
    });

    const task = await this.taskService.findByRoutine(id, token);
    task.map((task) => {
      return this.taskService.remove(task.id, user);
    });
    return;
  }

  async restore(id: number, user: UserJWT) {
    await this.routineRepository.update(id, {
      updated_by: user.id,
      is_deleted: false,
    });
    return;
  }
}
