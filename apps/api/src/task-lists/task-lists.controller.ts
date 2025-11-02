import { Controller, Get, Param } from "@nestjs/common";
import { TaskListsService } from "./task-lists.service";

@Controller('task-lists')
export class TaskListsController {
    constructor(private taskListsService: TaskListsService) {}

    @Get()
    findAll() {
        return this.taskListsService.findAllTaskLists({})
    }

    @Get(':id')
    find(@Param('id') taskListId: string) {
        return this.taskListsService.findTaskList({id: taskListId})
    }
}