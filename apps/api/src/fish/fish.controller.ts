import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { FishService } from './fish.service';
import { AuthGuard } from '@nestjs/passport';
import { FishOut, UpdateAllFish } from '@repo/api/fish';
import { Prisma } from '@repo/database';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('/fish')
export class FishController {
  constructor(private fishService: FishService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('all')
  updateAll(
    @Body() updateAllFishDto: UpdateAllFish,
    @CurrentUser() user: JwtUser,
  ): Promise<FishOut[]> {
    return this.fishService.updateAllFish(updateAllFishDto, user.userId);
  }
}
