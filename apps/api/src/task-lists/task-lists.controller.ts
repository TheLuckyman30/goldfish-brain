import { Controller, Get, Param } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { TaskListOut } from '@repo/api/task-list';
import { TaskOut } from '@repo/api/task';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('task-lists')
export class TaskListsController {
  constructor(private taskListsService: TaskListsService, private tasksService: TasksService) {}

  @Get()
  findAll(): Promise<TaskListOut[]> {
    return this.taskListsService.findAllTaskLists({});
  }

  @Get(':id')
  find(@Param('id') taskListId: string): Promise<TaskListOut> {
    return this.taskListsService.findTaskList({ id: taskListId });
  }

  @Get(':id/tasks')
  findAllTasksByList(@Param('id') taskLisId: string): Promise<TaskOut[]> {
    return this.tasksService.findAllTasks({where: {taskListId: taskLisId}});
  }
}
