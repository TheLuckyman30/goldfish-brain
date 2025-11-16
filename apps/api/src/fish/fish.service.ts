import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFish, FishOut } from '@repo/api/fish';

@Injectable()
export class FishService {
  constructor(private prisma: PrismaService) {}

  async createFish(newFishDto: CreateFish, userId: string): Promise<FishOut> {
    const task = await this.prisma.task.findUnique({
      where: { id: newFishDto.taskId },
      select: { taskList: { select: { userId: true } } },
    });

    if (!task) {
      throw new NotFoundException();
    }

    if (task.taskList.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.fish.create({
      data: newFishDto,
      select: { id: true, taskId: true, size: true, rarity: true },
    });
  }
}
