import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskOut } from '@repo/api/task';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(): Promise<TaskOut[]> {
    return this.tasksService.findAllTasks({});
  }

  @Get(':id')
  find(@Param('id') taskId: string): Promise<TaskOut> {
    return this.tasksService.findTask({ id: taskId });
  }
}
