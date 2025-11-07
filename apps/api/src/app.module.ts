import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskListsModule } from './task-lists/task-lists.module';
import { FoldersModule } from './folders/folders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TasksModule, TaskListsModule, FoldersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
