import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(
    info: Omit<Prisma.ReviewUncheckedCreateInput, 'review_id'>,
  ) {
    const newReview = await this.prisma.review.create({
      data: {
        review_id: ulid(),
        ...info,
      },
    });
    return newReview;
  }
}
