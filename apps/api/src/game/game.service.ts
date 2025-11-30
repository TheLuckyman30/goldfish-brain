import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateGame,
  DeleteGame,
  GameOut,
  GameOutWithFish,
} from '@repo/api/game';
import { Prisma } from '@repo/database';

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
                dueBy: true,
              },
            },
          },
        },
      },
    });
  }

  createGame(createGameDto: CreateGame, userId: string): Promise<GameOut> {
    return this.prisma.game.create({
      data: {
        userId: userId,
        fish: {
          createMany: { data: createGameDto.fish, skipDuplicates: true },
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
