import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FishOut, UpdateAllFish } from '@repo/api/fish';
import { Prisma } from '@repo/database';

@Injectable()
export class FishService {
  constructor(private prisma: PrismaService) {}

  updateAllFish(updateAllFishDto: UpdateAllFish): Promise<FishOut[]> {
    return this.prisma.$transaction(
      updateAllFishDto.fish.map((fish) => {
        return this.prisma.fish.update({
          where: { id: fish.id },
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
