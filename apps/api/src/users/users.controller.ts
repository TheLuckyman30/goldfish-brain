import { Body, Controller, Get, Param, Patch, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUser, UserOut } from '@repo/api/user';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getMe(@CurrentUser() auth: JwtUser): Promise<UserOut> {
    if (!auth || !auth.userId) {
      throw new UnauthorizedException()
    }
    return this.usersService.findUser({id: auth.userId});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<UserOut[]> {
    return this.usersService.findAllUsers({});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  find(@Param('id') userId: string): Promise<UserOut> {
    return this.usersService.findUser({ id: userId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  update(@Body() updateUserDto: UpdateUser): Promise<UserOut> {
    return this.usersService.updateUser(updateUserDto)
  }
}
