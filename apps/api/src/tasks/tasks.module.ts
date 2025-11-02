import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controllers";
import { TasksService } from "./tasks.service";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [TasksController],
    providers: [TasksService, PrismaService]
})
export class TasksModule {}