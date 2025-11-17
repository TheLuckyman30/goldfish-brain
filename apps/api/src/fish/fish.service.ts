import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateFish, FishOut, UpdateAllFish } from '@repo/api/fish';
import { Prisma } from '@repo/database';

@Injectable()
export class FishService {
  constructor(private prisma: PrismaService) {}

  updateFish(updateFishDto: UpdateFish): Promise<FishOut> {
    return this.prisma.fish.update({
      where: { id: updateFishDto.id },
      data: updateFishDto,
    });
  }

  updateAllFish(updateAllFishDto: UpdateAllFish): Promise<Prisma.BatchPayload> {
    return this.prisma.fish.updateMany({
      where: { gameId: updateAllFishDto.gameId },
      data: updateAllFishDto,
    });
  }
}
