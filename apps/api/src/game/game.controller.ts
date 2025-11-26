import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';
import {
  CreateGame,
  DeleteGame,
  GameOut,
  GameOutWithFish,
} from '@repo/api/game';

@Controller('/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findOne(@CurrentUser() user: JwtUser): Promise<GameOutWithFish> {
    return this.gameService.findGameByUserId({ userId: user.userId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() createGameDto: CreateGame,
    @CurrentUser() user: JwtUser,
  ): Promise<GameOut> {
    return this.gameService.createGame(createGameDto, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  delete(
    @Body() deleteGameDto: DeleteGame,
    @CurrentUser() user: JwtUser,
  ): Promise<GameOut> {
    return this.gameService.deleteGame(deleteGameDto, user.userId);
  }
}
