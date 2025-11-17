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

  async markComplete(id: string): Promise<CompletedFishOut> {
    return this.prisma.fish.update({
      where: { id },
      data: { completed: true },
    });
  }

  async markAllIncomplete(gameId: string) {
    return this.prisma.fish.updateMany({
      where: {
        gameId,
      },
      data: {
        completed: false,
      },
    });
  }
}
