import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';
import {
  CreateTaskList,
  DeleteTaskList,
  TaskListOut,
  TaskListTasksOut,
  UpdateTaskList,
} from '@repo/api/task-list';

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
        numTasks: true,
        numTasksCompleted: true,
      },
      where,
    });
  }

  async findTaskList(
    where: Prisma.TaskListWhereUniqueInput,
    userId: string,
  ): Promise<TaskListOut> {
    const taskList = await this.prisma.taskList.findUnique({
      select: {
        id: true,
        userId: true,
        folderId: true,
        name: true,
        description: true,
        numTasks: true,
        numTasksCompleted: true,
      },
      where,
    });

    if (!taskList) {
      throw new NotFoundException();
    }

    if (taskList.userId !== userId) {
      throw new ForbiddenException();
    }

    return taskList;
  }

  async findTasksByList(
    where: Prisma.TaskListWhereUniqueInput,
    userId: string,
  ): Promise<TaskListTasksOut> {
    const taskList = await this.prisma.taskList.findUnique({
      select: {
        id: true,
        userId: true,
        folderId: true,
        name: true,
        description: true,
        tasks: true,
      },
      where,
    });

    if (!taskList) {
      throw new NotFoundException();
    }

    if (taskList.userId !== userId) {
      throw new ForbiddenException();
    }

    return taskList;
  }

  createTaskList(
    createTaskListDto: CreateTaskList,
    userId: string,
  ): Promise<TaskListOut> {
    const newDto = { userId, ...createTaskListDto };
    return this.prisma.taskList.create({
      data: newDto,
      select: {
        id: true,
        userId: true,
        folderId: true,
        name: true,
        description: true,
        numTasks: true,
        numTasksCompleted: true,
      },
    });
  }

  async updateTaskList(
    updateTaskListDto: UpdateTaskList,
    userId: string,
  ): Promise<TaskListOut> {
    const taskList = await this.prisma.taskList.findUnique({
      where: { id: updateTaskListDto.id },
    });

    if (!taskList) {
      throw new NotFoundException();
    }

    if (taskList.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.taskList.update({
      data: updateTaskListDto,
      where: { id: updateTaskListDto.id },
    });
  }

  async deleteTaskList(
    deleteTaskListDto: DeleteTaskList,
    userId: string,
  ): Promise<TaskListOut> {
    const taskList = await this.prisma.taskList.findUnique({
      where: { id: deleteTaskListDto.id },
    });

    if (!taskList) {
      throw new NotFoundException();
    }

    if (taskList.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.taskList.delete({ where: { id: deleteTaskListDto.id } });
  }
}
