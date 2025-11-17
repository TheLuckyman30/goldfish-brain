import { Controller, Post, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';
import { GameOut } from '@repo/api/game';

@Controller('/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@CurrentUser() user: JwtUser): Promise<GameOut> {
    return this.gameService.createGame({ userId: user.userId });
  }
}
