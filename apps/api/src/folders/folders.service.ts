import { Injectable } from '@nestjs/common';
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

  findFolder(where: Prisma.FolderWhereUniqueInput): Promise<FolderOut> {
    return this.prisma.folder.findUnique({
      select: { id: true, userId: true, name: true, description: true },
      where,
    });
  }
}
