import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTask, TaskOut } from '@repo/api/task';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<TaskOut[]> {
    return this.tasksService.findAllTasks({});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  find(@Param('id') taskId: string): Promise<TaskOut> {
    return this.tasksService.findTask({ id: taskId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() newTask: CreateTask): Promise<TaskOut> {
    return this.tasksService.createTask(newTask);
  }
}
