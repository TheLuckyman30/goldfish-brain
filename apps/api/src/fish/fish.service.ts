import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFish, CompletedFishOut, FishOutWithTask } from '@repo/api/fish';
import { Prisma } from '@repo/database';

@Injectable()
export class FishService {
  constructor(private prisma: PrismaService) {}

  findManyFish(taskIds: string): Promise<FishOutWithTask[]> {
    const tasks = taskIds.split(',');
    return this.prisma.fish.findMany({
      where: { taskId: { in: tasks } },
      select: {
        id: true,
        taskId: true,
        size: true,
        rarity: true,
        task: {
          select: {
            id: true,
            taskListId: true,
            name: true,
            description: true,
            dueBy: true,
          },
        },
        completed: true,
      },
    });
  }

  async createManyFish(
    newFishDto: CreateFish[],
    userId: string,
  ): Promise<Prisma.BatchPayload> {
    return this.prisma.fish.createMany({
      data: newFishDto,
      skipDuplicates: true,
    });
  }

  async markComplete(id: string): Promise<CompletedFishOut> {
    return this.prisma.fish.update({
      where: {id},
      data: {completed: true},
    })
  }
}
