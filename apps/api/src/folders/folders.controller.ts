import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FolderOut } from '@repo/api/folder';
import { AuthGuard } from '@nestjs/passport';

@Controller('folders')
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<FolderOut[]> {
    return this.foldersService.findAllFolders({});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  find(@Param('id') folderId: string): Promise<FolderOut> {
    return this.foldersService.findFolder({ id: folderId });
  }
}
