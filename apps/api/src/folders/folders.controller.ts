import { Controller, Get, Param } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FolderOut } from '@repo/api/folder';

@Controller('folders')
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Get()
  findAll(): Promise<FolderOut[]> {
    return this.foldersService.findAllFolders({});
  }

  @Get()
  find(@Param('id') folderId: string): Promise<FolderOut> {
    return this.foldersService.findFolder({ id: folderId });
  }
}
