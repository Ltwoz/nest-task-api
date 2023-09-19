import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { User } from 'src/users/users.entity';
import { SearchTasksDTO } from './dto/search-tasks.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        try {
            const { title, description } = createTaskDto;

            const task = this.taskRepository.create({
                title,
                description,
                user,
            });

            await this.taskRepository.save(task);
            return task;
        } catch (error) {
            throw new ConflictException({
                message: ['Somethings wrong I can feel it.'],
            });
        }
    }

    async getTasks(
        user: User,
        searchTasksDTO: SearchTasksDTO,
    ): Promise<Task[]> {
        try {
            const { search } = searchTasksDTO;

            const query = this.taskRepository.createQueryBuilder('task');
            query.where({ user });

            if (search) {
                query.andWhere(
                    '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                    { search: `%${search}%` },
                );
            }

            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            throw new NotFoundException({
                message: ['Task not found.'],
            });
        }
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        try {
            const task = await this.taskRepository.findOne({
                where: { id, user },
            });
            return task;
        } catch (error) {
            throw new NotFoundException({
                message: ['Task not found.'],
            });
        }
    }

    async updateTask(
        id: string,
        updateTaskDTO: UpdateTaskDTO,
        user: User,
    ): Promise<Task> {
        try {
            const task = await this.getTaskById(id, user);

            const { title, description } = updateTaskDTO;

            if (title) {
                task.title = title;
            }

            if (description) {
                task.description = description;
            }

            await this.taskRepository.save(task);
            return task;
        } catch (error) {
            throw new NotFoundException({
                message: ['Task not found.'],
            });
        }
    }

    async deleteTask(id: string, user: User): Promise<Task> {
        try {
            const task = await this.getTaskById(id, user);
            await this.taskRepository.delete(id);
            return task;
        } catch (error) {
            throw new NotFoundException({
                message: ['Task not found.'],
            });
        }
    }
}
