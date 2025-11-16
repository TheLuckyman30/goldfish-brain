import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FishService } from './fish.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFish } from '@repo/api/fish';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('/fish')
export class FishController {
  constructor(private fishService: FishService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() newFishDto: CreateFish, @CurrentUser() user: JwtUser) {
    return this.fishService.createFish(newFishDto, user.userId);
  }
}
