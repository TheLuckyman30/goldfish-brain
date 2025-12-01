import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FishOut, UpdateAllFish } from '@repo/api/fish';

@Injectable()
export class FishService {
  constructor(private prisma: PrismaService) {}

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

    return this.prisma.$transaction(
      updateAllFishDto.fish.map((fish) => {
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
