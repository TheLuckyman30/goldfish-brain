import { Module } from '@nestjs/common';
import { TaskListsController } from './task-lists.controller';
import { TaskListsService } from './task-lists.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TaskListsController],
  providers: [TaskListsService, PrismaService],
})
export class TaskListsModule {}
