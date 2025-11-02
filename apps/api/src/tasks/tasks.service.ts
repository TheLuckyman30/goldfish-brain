import { Injectable } from "@nestjs/common";
import { Prisma } from "@repo/database";
import { PrismaService } from "src/prisma.service";
import { TaskOut } from '@repo/api/task'

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    findAllTasks(params: {where?: Prisma.TaskWhereInput}): Promise<TaskOut[]>  {
        const {where} = params
        return this.prisma.task.findMany({select: {id: true, taskListId: true, name: true, description: true, dueBy: true}, where});
    }
    
    findTask(where: Prisma.TaskWhereUniqueInput): Promise<TaskOut> {
        return this.prisma.task.findUnique({select: {id: true, taskListId: true, name: true, description: true, dueBy: true}, where})
    }
}