import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Routine } from 'src/routine/entities/routine.entity';
import { UserJWT } from 'src/common/interfaces/jwt.interface';
import { Topic } from 'src/topic/entities/topic.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(Routine)
    private RoutineRepository: Repository<Routine>
  ) { }

  async create(createTaskDtoArray: CreateTaskDto[], user: UserJWT) {
    try {
      const InvalidTask: Partial<Task>[] = [];
      const tasks: Promise<Partial<Task>>[] = createTaskDtoArray.map(
        async (createTaskDto): Promise<Partial<Task>> => {
          const routine = await this.RoutineRepository.findOne({
            where: { id: createTaskDto.routine_id, is_deleted: false },
            relations: ['assignedTo'],
          });
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
          if (routine.assignedTo.perssonel_type !== topic.name) {
            delete task.routine;
            console.log('ssddfsfdsdfsfds');
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
          delete task.routine;
          return { ...task, routine: task.routine.id };
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
    const tasks = await this.tasksRepository.find({
      where: { is_deleted: false },
    });
    return { stastusCode: 200, message: 'Get all Tasks', data: tasks };
  }

  async findOne(id: number) {
    const task = await this.tasksRepository.findOne({
      where: { id, is_deleted: false },
    });
    return { stastusCode: 200, message: 'Get Task by id', data: task };
  }

  async findByRoutine(routine_id: number) {
    try {
      const task = await this.tasksRepository.find({
        where: { routine: { id: routine_id }, is_deleted: false },
      });
      return task;
    }catch (error) {
      console.error('Error getting tasks by routine:', error);
      return error;
    }
  }

  async update(id: number, UpdateTaskDto: UpdateTaskDto, user: UserJWT) {
    try {
      if (user.role.name === 'perssonel') {
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
      if (user.role.name === 'perssonel') {
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
