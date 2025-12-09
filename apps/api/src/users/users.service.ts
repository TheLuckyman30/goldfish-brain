import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUser, UserOut } from '@repo/api/user';
import { Prisma } from '@repo/database';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly domain = process.env.AUTH0_DOMAIN!;
  private readonly clientId = process.env.AUTH0_CLIENT_ID!;
  private readonly audience = `https://${this.domain}/api/v2/`;

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

  updateUser(updateUserDto: UpdateUser, userId: string): Promise<UserOut> {
    return this.prisma.user.update({
      select: { id: true, name: true, username: true, email: true },
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async getProvider(userId: string): Promise<{ provider: string }> {
    const auth = await this.prisma.authentication.findUnique({
      where: { userId },
    });
    return {
      provider: auth.provider,
    };
  }

  async sendPasswordResetEmail(email: string) {
    const res = await fetch(
      `https://${this.domain}/dbconnections/change_password`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          email,
          connection: 'Username-Password-Authentication',
        }),
      },
    );

    const body = await res.text();
    return { ok: res.ok, body };
  }
}
