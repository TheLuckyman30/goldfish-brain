import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';
import { CreateTask, DeleteTask, TaskOut, UpdateTask } from '@repo/api/task';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  findAllTasks(params: { where?: Prisma.TaskWhereInput }): Promise<TaskOut[]> {
    const { where } = params;
    return this.prisma.task.findMany({
      select: {
        id: true,
        taskListId: true,
        name: true,
        description: true,
        dueBy: true,
        hasFish: true,
      },
      where,
    });
  }

  async findTask(
    where: Prisma.TaskWhereUniqueInput,
    userId: string,
  ): Promise<TaskOut> {
    const task = await this.prisma.task.findUnique({
      select: {
        id: true,
        taskListId: true,
        name: true,
        description: true,
        dueBy: true,
        hasFish: true,
        taskList: { select: { userId: true } },
      },
      where,
    });

    if (!task) {
      throw new NotFoundException();
    }

    if (task.taskListId && task.taskList.userId !== userId) {
      throw new ForbiddenException();
    }

    return {
      id: task.id,
      taskListId: task.taskListId,
      name: task.name,
      description: task.description,
      dueBy: task.dueBy,
      hasFish: task.hasFish,
    };
  }

  async createTask(newTaskDto: CreateTask, userId: string): Promise<TaskOut> {
    const taskList = await this.prisma.taskList.findUnique({
      where: { id: newTaskDto.taskListId },
    });

    if (!taskList) {
      throw new NotFoundException();
    }

    if (taskList.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.task.create({
      data: newTaskDto,
      select: {
        id: true,
        taskListId: true,
        name: true,
        description: true,
        dueBy: true,
        hasFish: true,
      },
    });
  }

  async updateTask(
    updateTaskDto: UpdateTask,
    userId: string,
  ): Promise<TaskOut> {
    const taskList = await this.prisma.taskList.findUnique({
      where: { id: updateTaskDto.taskListId },
    });

    if (!taskList) {
      throw new NotFoundException();
    }

    if (taskList.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.task.update({
      data: updateTaskDto,
      where: { id: updateTaskDto.id },
      select: {
        id: true,
        taskListId: true,
        name: true,
        description: true,
        dueBy: true,
        hasFish: true,
      },
    });
  }

  async deleteTask(
    deleteTaskDto: DeleteTask,
    userId: string,
  ): Promise<TaskOut> {
    const taskList = await this.prisma.taskList.findUnique({
      where: { id: deleteTaskDto.taskListId },
    });

    if (!taskList) {
      throw new NotFoundException();
    }

    if (taskList.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.prisma.task.delete({
      where: { id: deleteTaskDto.id },
      select: {
        id: true,
        taskListId: true,
        name: true,
        description: true,
        dueBy: true,
        hasFish: true,
      },
    });
  }
}
