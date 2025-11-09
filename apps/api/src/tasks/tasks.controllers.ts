import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTask, TaskOut } from '@repo/api/task';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@CurrentUser() user: JwtUser): Promise<TaskOut[]> {
    return this.tasksService.findAllTasks({where: {taskList: {userId: user.userId}}});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  find(@Param('id') taskId: string, @CurrentUser() user: JwtUser): Promise<TaskOut> {
    return this.tasksService.findTask({ id: taskId }, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() newTask: CreateTask): Promise<TaskOut> {
    return this.tasksService.createTask(newTask);
  }
}
