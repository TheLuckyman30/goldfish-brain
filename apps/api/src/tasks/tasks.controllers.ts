import { Controller, Get, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    findAll() {
        return this.tasksService.findAllTasks({})
    }

    @Get(':id')
    find(@Param('id') taskId: string) {
        return this.tasksService.findTask({id: taskId})
    }
}