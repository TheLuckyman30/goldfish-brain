import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserOut } from '@repo/api/user';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<UserOut[]> {
    return this.userService.findAllUsers({});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  find(@Param('id') userId: string): Promise<UserOut> {
    return this.userService.findUser({ id: userId });
  }
}
