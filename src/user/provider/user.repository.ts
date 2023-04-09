import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../../prisma/prisma.service';

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
    return newUser;
  }

  async findOneUser(info: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({ where: info });
    return user;
  }

  async getUserList({ user, page }: { user: string; page: string }) {
    const user_id =
      user && user === 'all' ? undefined : user ? user : undefined;
    const skip = !isNaN(Number([page])) ? (Number([page]) - 1) * 10 : 0;
    const users = await this.prisma.user.findMany({
      where: { user_id },
      skip,
      take: 10,
    });
    const total_count = await this.prisma.user.count({
      where: {
        user_id,
        status: 'ACTIVE',
      },
    });
    return { users, total_count };
  }
}
