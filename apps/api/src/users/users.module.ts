import { Module } from '@nestjs/common';
import { Auth0Service } from './auth0.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Auth0Service],
})
export class UsersModule {}
