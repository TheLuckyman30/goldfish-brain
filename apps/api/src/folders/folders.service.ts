import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';
import { FolderOut } from '@repo/api/folder';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  findAllFolders(params: {
    where?: Prisma.FolderWhereInput;
  }): Promise<FolderOut[]> {
    const { where } = params;
    return this.prisma.folder.findMany({
      select: { id: true, userId: true, name: true, description: true },
      where,
    });
  }

  async findFolder(where: Prisma.FolderWhereUniqueInput, userId: string): Promise<FolderOut> {
    const folder = await this.prisma.folder.findUnique({
      select: { id: true, userId: true, name: true, description: true },
      where,
    });

    if (!folder) {
      throw new NotFoundException();
    }

    if (folder.userId !== userId) {
      throw new ForbiddenException();
    }

    return folder;
  }
}
