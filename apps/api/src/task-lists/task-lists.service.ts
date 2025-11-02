import { Injectable } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';
import { TaskListOut } from '@repo/api/task-list';

@Injectable()
export class TaskListsService {
  constructor(private prisma: PrismaService) {}

  findAllTaskLists(params: {
    where?: Prisma.TaskListWhereInput;
  }): Promise<TaskListOut[]> {
    const { where } = params;
    return this.prisma.taskList.findMany({
      select: {
        id: true,
        userId: true,
        folderId: true,
        name: true,
        description: true,
      },
      where,
    });
  }

  findTaskList(where: Prisma.TaskListWhereUniqueInput): Promise<TaskListOut> {
    return this.prisma.taskList.findUnique({
      select: {
        id: true,
        userId: true,
        folderId: true,
        name: true,
        description: true,
      },
      where,
    });
  }
}
