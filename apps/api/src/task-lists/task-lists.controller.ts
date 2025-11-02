import { Controller, Get, Param } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { TaskListOut } from '@repo/api/task-list';

@Controller('task-lists')
export class TaskListsController {
  constructor(private taskListsService: TaskListsService) {}

  @Get()
  findAll(): Promise<TaskListOut[]> {
    return this.taskListsService.findAllTaskLists({});
  }

  @Get(':id')
  find(@Param('id') taskListId: string): Promise<TaskListOut> {
    return this.taskListsService.findTaskList({ id: taskListId });
  }
}
