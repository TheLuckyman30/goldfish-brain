import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateGame,
  DeleteGame,
  GameOut,
  GameOutWithFish,
} from '@repo/api/game';
import { Prisma } from '@repo/database';
import { fishGenerator } from 'src/utils/fish-generator';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  findGameByUserId(
    where: Prisma.GameWhereUniqueInput,
  ): Promise<GameOutWithFish> {
    return this.prisma.game.findUnique({
      where,
      select: {
        id: true,
        userId: true,
        fish: {
          select: {
            id: true,
            taskId: true,
            size: true,
            rarity: true,
            isActive: true,
            completed: true,
            task: {
              select: {
                id: true,
                taskListId: true,
                name: true,
                description: true,
                completed: true,
                dueBy: true,
              },
            },
          },
        },
      },
    });
  }

  async createGame(
    createGameDto: CreateGame,
    userId: string,
  ): Promise<GameOut> {
    const taskList = await this.prisma.taskList.findUnique({
      where: { id: createGameDto.taskListId },
      select: { id: true, userId: true },
    });

    if (!taskList) {
      throw new NotFoundException();
    }

    if (taskList.userId !== userId) {
      throw new ForbiddenException();
    }

    const tasks = await this.prisma.task.findMany({
      where: { taskListId: taskList.id },
      select: { id: true },
    });
    const fish = fishGenerator(tasks);

    return this.prisma.game.create({
      data: {
        userId: userId,
        linkedTaskListId: createGameDto.taskListId,
        fish: {
          createMany: { data: fish, skipDuplicates: true },
        },
      },
      select: {
        id: true,
        userId: true,
      },
    });
  }

  deleteGame(deleteGameDto: DeleteGame, userId: string): Promise<GameOut> {
    return this.prisma.game.delete({
      where: { id: deleteGameDto.id, userId: userId },
    });
  }
}
