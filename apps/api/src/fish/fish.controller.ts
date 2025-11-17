import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { FishService } from './fish.service';
import { AuthGuard } from '@nestjs/passport';
import { MarkAllIncompleteDto } from '@repo/api/fish';

@Controller('/fish')
export class FishController {
  constructor(private fishService: FishService) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/complete')
  markComplete(@Param('id') id: string) {
    return this.fishService.markComplete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('reset')
  markAllIncomplete(@Body() body: MarkAllIncompleteDto) {
    return this.fishService.markAllIncomplete(body.gameId);
  }
}
