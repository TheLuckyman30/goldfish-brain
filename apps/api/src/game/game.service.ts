import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGame, GameOut } from '@repo/api/game';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  createGame(createGameDto: CreateGame): Promise<GameOut> {
    return this.prisma.game.create({ data: createGameDto });
  }
}
