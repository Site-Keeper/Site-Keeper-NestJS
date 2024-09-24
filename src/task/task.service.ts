import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Routine } from 'src/routine/entities/routine.entity';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import { Topic } from 'src/topic/entities/topic.entity';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class TaskService {
  private readonly javaServiceUrl =
    'https://site-keeper-springboot.onrender.com/api/spaces';
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(Routine)
    private RoutineRepository: Repository<Routine>
  ) {}

  async create(
    createTaskDtoArray: CreateTaskDto[],
    user: UserJWT,
    token: string
  ) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const InvalidTask: Partial<Task>[] = [];
      const tasks: Promise<Partial<Task>>[] = createTaskDtoArray.map(
        async (createTaskDto): Promise<Partial<Task>> => {
          const routine = await this.RoutineRepository.findOne({
            where: { id: createTaskDto.routine_id, is_deleted: false },
            relations: ['assigned_to'],
          });
          console.log(routine);
          const spaces = await axios.get(`${this.javaServiceUrl}`, config);
          if (
            spaces.data.some((space) => space.id === createTaskDto.space_id) ===
            false
          ) {
            throw new BadRequestException('space not found');
          }
          const topic = await this.topicRepository.findOneBy({
            id: createTaskDto.topic_id,
          });
          const task: Partial<Task> = {
            title: createTaskDto.title,
            description: createTaskDto.description,
            state: createTaskDto.state,
            space_id: createTaskDto.space_id,
            object_id: createTaskDto.object_id,
            is_deleted: createTaskDto.is_deleted,
            routine,
            topic,
            created_by: user.id,
            updated_by: user.id,
          };
          console.log(routine.assigned_to.personnel_type, topic.name);
          const personnelType = routine.assigned_to.personnel_type
            .trim()
            .toLowerCase();
          const topicName = topic.name.trim().toLowerCase();
          if (personnelType !== topicName) {
            delete task.routine;
            InvalidTask.push(task);
            return;
          }
          return task;
        }
      );
      const tasksRes = await Promise.all(tasks);
      if (tasksRes[0]) {
        await this.tasksRepository.save(tasksRes);
        const tasksResponse = tasksRes.map((task) => {
          const newTask = { ...task, routine: task.routine.id };
          delete task.routine;
          return newTask;
        });
        return {
          statusCode: 201,
          message: 'Task created successfully',
          data: { tasksResponse, InvalidTask },
        };
      }
      return {
        statusCode: 400,
        message:
          'invalid request,  type of tasks do not match the type of personnel',
        data: { InvalidTask },
      };
    } catch (error) {
      console.error('Error creating the tasks:', error);
      return {
        statusCode: 500,
        message: 'Error creating the tasks',
        error,
      };
    }
  }

  async findAll() {
    try {
      const tasks = await this.tasksRepository.find({
        where: { is_deleted: false },
      });
      return tasks;
    } catch (error) {
      return error;
    }
  }

  async findStatistics() {
    try {
      const tasks = await this.tasksRepository.find({
        where: { is_deleted: false },
      });
      const tasksCompleted = tasks.filter((task) => task.state === 'COMPLETED');
      const tasksCancelled = tasks.filter((task) => task.state === 'CANCELLED');

      return {
        total: tasks.length,
        completed: tasksCompleted.length,
        cancelled: tasksCancelled.length,
      };
    } catch (error) {
      console.error('Error creating the tasks:', error);
      return { error };
    }
  }

  async findOne(id: number) {
    try {
      const task = await this.tasksRepository.findOne({
        where: { id, is_deleted: false },
      });
      return task;
    } catch (error) {
      return error;
    }
  }

  async findByRoutine(routine_id: number, token: string) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const task = await this.tasksRepository.find({
        where: { routine: { id: routine_id }, is_deleted: false },
        relations: ['topic'],
      });
      const spacesResponse = await axios.get(`${this.javaServiceUrl}`, config);
      const spaces = spacesResponse.data;

      // 3. Combinar las tareas con los espacios
      const tasksWithSpaces = task.map((task) => {
        const space = spaces.find((space: any) => space.id === task.space_id);
        delete task.space_id;
        return {
          ...task,
          spaceName: space ? space.name : 'Nombre no encontrado', // Si encuentra el espacio, guarda el nombre, si no, guarda un mensaje.
        };
      });
      return tasksWithSpaces;
    } catch (error) {
      console.error('Error getting tasks by routine:', error);
      return error;
    }
  }

  async update(id: number, UpdateTaskDto: UpdateTaskDto, user: UserJWT) {
    try {
      if (user.role.name === 'personnel') {
        if (Object.keys(UpdateTaskDto).length > 1) {
          throw new UnauthorizedException(
            'solo puedes actualizar el estado unicamente '
          );
        } else if (!Object.keys(UpdateTaskDto).includes('state')) {
          throw new UnauthorizedException();
        }
      }
      const task = await this.tasksRepository.findOne({
        where: { id, is_deleted: false },
      });
      if (UpdateTaskDto.routine_id) {
        const routine = await this.RoutineRepository.findOne({
          where: { id: UpdateTaskDto.routine_id },
        });
        delete UpdateTaskDto.routine_id;
        task.routine = routine;
      }
      const updateTask = { ...UpdateTaskDto, updated_by: user.id };
      Object.assign(task, updateTask);
      return await this.tasksRepository.save(task);
    } catch (error) {
      console.error('Error update the task:', error);
      return {
        statusCode: 500,
        message: 'Error update the task',
        error,
      };
    }
  }

  async remove(id: number, user: UserJWT) {
    try {
      await this.tasksRepository.update(id, {
        updated_by: user.id,
        is_deleted: true,
      });
      return;
    } catch (error) {
      console.error('Error update the task:', error);
      return {
        statusCode: 500,
        message: 'Error update the task',
        error,
      };
    }
  }

  async restore(id: number, user: UserJWT) {
    try {
      if (user.role.name === 'personnel') {
        throw new UnauthorizedException(
          'solo puedes actualizar el estado unicamente '
        );
      }
      await this.tasksRepository.update(id, {
        updated_by: user.id,
        is_deleted: false,
      });
      return;
    } catch (error) {
      console.error('Error update the task:', error);
      return {
        statusCode: 500,
        message: 'Error update the task',
        error,
      };
    }
  }
}
