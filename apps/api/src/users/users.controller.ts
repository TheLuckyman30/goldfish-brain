import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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
      throw new UnauthorizedException();
    }
    return this.usersService.findUser({ id: auth.userId });
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
  update(
    @Body() updateUserDto: UpdateUser,
    @CurrentUser() user: JwtUser,
  ): Promise<UserOut> {
    return this.usersService.updateUser(updateUserDto, user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me/auth-type')
  async getMeAuthType(@CurrentUser() auth: JwtUser) {
    if (!auth || !auth.userId) {
      throw new UnauthorizedException();
    }
    return this.usersService.getProvider(auth.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('reset-password')
  async resetPassword(@CurrentUser() user: JwtUser) {
    if (user.provider !== 'auth0') {
      throw new BadRequestException('External accounts cannot reset password');
    }

    const dbUser = await this.usersService.findUser({ id: user.userId });

    return this.usersService.sendPasswordResetEmail(dbUser.email);
  }
}
