import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskListsModule } from './task-lists/task-list.module';

@Module({
  imports: [UsersModule, TasksModule, TaskListsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
