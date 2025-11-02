import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    findAll() {
        return this.userService.findAllUsers({})
    }

    @Get(':id')
    find(@Param('id') userId: string) {
        return this.userService.findUser({id: userId})
    }
}