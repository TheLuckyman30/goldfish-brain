import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserOut } from '@repo/api/user';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll(): Promise<UserOut[]> {
    return this.userService.findAllUsers({});
  }

  @Get(':id')
  find(@Param('id') userId: string): Promise<UserOut> {
    return this.userService.findUser({ id: userId });
  }
}
