import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { FishService } from './fish.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFish, MarkAllIncompleteDto } from '@repo/api/fish';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('/fish')
export class FishController {
  constructor(private fishService: FishService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findMany(@Query('taskIds') taskIds: string) {
    return this.fishService.findManyFish(taskIds);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createMany(@Body() newFishDto: CreateFish[], @CurrentUser() user: JwtUser) {
    return this.fishService.createManyFish(newFishDto, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/complete')
  markComplete(@Param('id') id: string) {
    return this.fishService.markComplete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  markAllIncomplete(@Body() body: MarkAllIncompleteDto) {
    return this.fishService.markAllIncomplete(body.taskListId)
  }
}
