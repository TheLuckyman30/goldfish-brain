import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { TaskListOut } from '@repo/api/task-list';
import { TaskOut } from '@repo/api/task';
import { TasksService } from 'src/tasks/tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('task-lists')
export class TaskListsController {
  constructor(private taskListsService: TaskListsService, private tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@CurrentUser() user: JwtUser): Promise<TaskListOut[]> {
    return this.taskListsService.findAllTaskLists({where: {userId: user.userId}});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  find(@Param('id') taskListId: string, @CurrentUser() user: JwtUser): Promise<TaskListOut> {
    return this.taskListsService.findTaskList({ id: taskListId, userId: user.userId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/tasks')
  findAllTasksByList(@Param('id') taskLisId: string, @CurrentUser() user: JwtUser): Promise<TaskOut[]> {
    return this.tasksService.findAllTasks({where: {taskListId: taskLisId, taskList: {userId: user.userId}}});
  }
}
