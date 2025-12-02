import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFish, FishOut, UpdateAllFish } from '@repo/api/fish';
import { TasksService } from 'src/tasks/tasks.service';
import { UpdateTask } from '@repo/api/task';
import { Prisma } from '@repo/database';

@Injectable()
export class FishService {
  constructor(
    private prisma: PrismaService,
    private task: TasksService,
  ) {}

  async updateAllFish(
    updateAllFishDto: UpdateAllFish,
    userId: string,
  ): Promise<FishOut[]> {
    const game = await this.prisma.game.findUnique({
      where: { id: updateAllFishDto.gameId },
    });

    if (!game) {
      throw new NotFoundException();
    }

    if (game.userId !== userId) {
      throw new ForbiddenException();
    }

    return await Promise.all(
      updateAllFishDto.fish.map(async (fish) => {
        const currentFish = await this.prisma.fish.findUnique({
          where: { id: fish.id, gameId: updateAllFishDto.gameId },
        });

        if (currentFish.completed !== fish.completed) {
          const updateTaskDto: UpdateTask = {
            id: fish.task.id,
            taskListId: fish.task.taskListId,
            completed: fish.completed,
          };
          await this.task.updateTask(updateTaskDto, userId);
        }

        return this.prisma.fish.update({
          where: { id: fish.id, gameId: updateAllFishDto.gameId },
          data: { isActive: fish.isActive, completed: fish.completed },
          select: {
            id: true,
            taskId: true,
            size: true,
            rarity: true,
            isActive: true,
            completed: true,
          },
        });
      }),
    );
  }
}
