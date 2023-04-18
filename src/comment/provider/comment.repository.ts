import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
}
