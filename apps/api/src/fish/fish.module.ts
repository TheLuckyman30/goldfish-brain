import { Module } from '@nestjs/common';
import { FishController } from './fish.controller';
import { FishService } from './fish.service';
import { PrismaService } from 'src/prisma.service';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  controllers: [FishController],
  providers: [FishService, TasksService, PrismaService],
})
export class FishModule {}
