import { prisma } from './client';
import {users, taskLists, tasks} from './fake-data.json'

(async () => {
  try {
    await Promise.all(
      users.map(async (user) => {
        await prisma.user.create({data: {id: user.id, name: user.name, username: user.username, email: user.email}})
      })
    );

    await Promise.all(
      taskLists.map(async (list) => {
        await prisma.taskList.create({data: {id: list.id, userId: list.userId, name: list.name, description: list.description}})
      })
    );

    await Promise.all(
      tasks.map(async (task) => {
        await prisma.task.create({data: {id: task.id, taskListId: task.taskListId, name: task.name, description: task.description}})
      })
    )
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
