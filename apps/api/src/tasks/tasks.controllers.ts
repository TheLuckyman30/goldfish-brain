import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTask, TaskOut, UpdateTask } from '@repo/api/task';
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
  create(@Body() newTaskDto: CreateTask, @CurrentUser() user: JwtUser): Promise<TaskOut> {
    return this.tasksService.createTask(newTaskDto, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  update(@Body() updateTaskDto: UpdateTask, @CurrentUser() user: JwtUser): Promise<TaskOut> {
    return this.tasksService.updateTask(updateTaskDto, user.userId);
  }
}
