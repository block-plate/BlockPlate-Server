import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async uniqueEmail(email: string) {
    const exist = await this.prisma.user.findUnique({
      select: { user_id: true, name: true },
      where: { email },
    });
    return exist;
  }

  async checkUserJWT({ user_id }) {
    const checkUser = await this.prisma.user.findUnique({
      select: { name: true, user_id: true, email: true },
      where: { user_id },
    });

    return checkUser;
  }
  async createUser(info: Omit<Prisma.UserUncheckedCreateInput, 'user_id'>) {
    const newUser = await this.prisma.user.create({
      data: {
        user_id: ulid(),
        ...info,
      },
    });
    console.log('!');

    return newUser;
  }

  async findUserByEmail({ email }) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findOneUser(info: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({ where: info });
    return user;
  }

  async checkUserType({ user_id }) {
    const checkUser = await this.prisma.user.findUnique({
      where: { user_id },
    });
    return checkUser.type;
  }

  async getUserList() {
    const users = await this.prisma.user.findMany({
      where: {
        status: 'ACTIVE',
      },
    });
    return users;
  }
}
