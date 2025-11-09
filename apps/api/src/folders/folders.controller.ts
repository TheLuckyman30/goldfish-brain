import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FolderOut } from '@repo/api/folder';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('folders')
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@CurrentUser() user: JwtUser): Promise<FolderOut[]> {
    return this.foldersService.findAllFolders({where: {userId: user.userId}});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  find(@Param('id') folderId: string, @CurrentUser() user: JwtUser): Promise<FolderOut> {
    return this.foldersService.findFolder({ id: folderId, userId: user.userId});
  }
}
