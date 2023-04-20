import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(
    info: Omit<Prisma.CommentUncheckedCreateInput, 'comment_id'>,
  ) {
    const newComment = await this.prisma.comment.create({
      data: {
        comment_id: ulid(),
        ...info,
      },
    });
    return newComment;
  }

  async findOneComment(info: Prisma.CommentWhereInput) {
    const comment = await this.prisma.comment.findFirst({ where: info });
    return comment;
  }

  async deleteStatusComment(info: Prisma.CommentWhereUniqueInput) {
    const deletedComment = await this.prisma.comment.update({
      where: info,
      data: {
        status: E_status.DELETED,
      },
    });
    return deletedComment;
  }
}
