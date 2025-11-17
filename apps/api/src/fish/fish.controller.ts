import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { FishService } from './fish.service';
import { AuthGuard } from '@nestjs/passport';
import { FishOut, UpdateAllFish, UpdateFish } from '@repo/api/fish';
import { Prisma } from '@repo/database';

@Controller('/fish')
export class FishController {
  constructor(private fishService: FishService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('one')
  update(@Body() updateFishDto: UpdateFish): Promise<FishOut> {
    return this.fishService.updateFish(updateFishDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('all')
  updateAll(
    @Body() updateAllFishDto: UpdateAllFish,
  ): Promise<Prisma.BatchPayload> {
    return this.fishService.updateAllFish(updateAllFishDto);
  }
}
