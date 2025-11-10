import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { CreateTaskList, TaskListOut, TaskListTasksOut } from '@repo/api/task-list';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('task-lists')
export class TaskListsController {
  constructor(private taskListsService: TaskListsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@CurrentUser() user: JwtUser): Promise<TaskListOut[]> {
    return this.taskListsService.findAllTaskLists({where: {userId: user.userId}});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  find(@Param('id') taskListId: string, @CurrentUser() user: JwtUser): Promise<TaskListOut> {
    return this.taskListsService.findTaskList({ id: taskListId }, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/tasks')
  findAllTasksByList(@Param('id') taskLisId: string, @CurrentUser() user: JwtUser): Promise<TaskListTasksOut> {
    return this.taskListsService.findTasksByList({id: taskLisId}, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@CurrentUser() user: JwtUser, @Body() newTaskList: CreateTaskList): Promise<TaskListOut> {
    return this.taskListsService.createTaskList(user.userId, newTaskList);
  }
}
