import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { TaskInterceptor } from './interceptors/task.interceptor';
import { SearchTasksDTO } from './dto/search-tasks.dto';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(TaskInterceptor)
    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @Req() { user }: any,
    ): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getTasks(
        @Req() { user }: any,
        @Query() searchTasksDTO: SearchTasksDTO,
    ): Promise<Task[]> {
        return this.taskService.getTasks(user, searchTasksDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getTaskById(@Param('id') id: string, @Req() { user }: any): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/update')
    updateTask(
        @Param('id') id: string,
        @Body() updateTaskDTO: UpdateTaskDTO,
        @Req() { user }: any,
    ): Promise<Task> {
        return this.taskService.updateTask(id, updateTaskDTO, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    deleteTask(@Param('id') id: string, @Req() { user }: any): Promise<Task> {
        return this.taskService.deleteTask(id, user);
    }
}
