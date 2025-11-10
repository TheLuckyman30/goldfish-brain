import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUser, UserOut } from '@repo/api/user';
import { Prisma } from '@repo/database';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAllUsers(params: { where?: Prisma.UserWhereInput }): Promise<UserOut[]> {
    const { where } = params;
    return this.prisma.user.findMany({
      select: { id: true, name: true, username: true, email: true },
      where,
    });
  }

  findUser(where: Prisma.UserWhereUniqueInput): Promise<UserOut> {
    return this.prisma.user.findUnique({
      select: { id: true, name: true, username: true, email: true },
      where,
    });
  }

  updateUser(updateUserDto: UpdateUser): Promise<UserOut> {
    return this.prisma.user.update({select: { id: true, name: true, username: true, email: true }, where: {id: updateUserDto.id}, data: updateUserDto})
  }
}
