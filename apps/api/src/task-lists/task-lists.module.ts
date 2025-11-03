import { Module } from '@nestjs/common';
import { TaskListsController } from './task-lists.controller';
import { TaskListsService } from './task-lists.service';
import { PrismaService } from 'src/prisma.service';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  controllers: [TaskListsController],
  providers: [TaskListsService, TasksService, PrismaService],
})
export class TaskListsModule {}
