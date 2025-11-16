import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFish, FishOutWithTask } from '@repo/api/fish';
import { Prisma } from '@repo/database';

@Injectable()
export class FishService {
  constructor(private prisma: PrismaService) {}

  async createManyFish(
    newFishDto: CreateFish[],
    userId: string,
  ): Promise<Prisma.BatchPayload> {
    return this.prisma.fish.createMany({
      data: newFishDto,
      skipDuplicates: true,
    });
  }
}
