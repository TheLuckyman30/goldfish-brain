import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controllers';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';
import { TaskListsService } from 'src/task-lists/task-lists.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}
