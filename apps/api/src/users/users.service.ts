import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUser, UserOut } from '@repo/api/user';
import { Prisma } from '@repo/database';
import { Auth0Service } from './auth0.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private auth0Service: Auth0Service,
  ) {}

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

  async getProvider(userId: string): Promise<{ provider: string }> {
    const auth = await this.prisma.authentication.findUnique({
      where: { userId },
    });
    return {
      provider: auth.provider,
    };
  }

  async updateUsernameForMe(userId: string, newUsername: string) {
    const auth = await this.prisma.authentication.findUnique({
      where: { userId },
    });

    if (auth.provider !== 'auth0') {
      throw new BadRequestException('External accounts cannot change username');
    }

    const auth0UserId = auth.provider+"|"+auth.providerId;
    await this.auth0Service.updateUsername(auth0UserId, newUsername);

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { username: newUsername },
    });

    return updated;
  }
}
