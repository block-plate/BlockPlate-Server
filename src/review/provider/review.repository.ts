import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
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

  async findOneReview(info: Prisma.ReviewWhereInput) {
    const review = await this.prisma.review.findFirst({ where: info });
    return review;
  }

  async getReviewList({ course }: { course: string }) {
    const course_id =
      course && course === 'all' ? undefined : course ? course : undefined;
    const reviews = await this.prisma.review.findMany({
      where: { course_id, status: 'ACTIVE' },
    });

    return reviews;
  }

  async deleteStatusReview(info: Prisma.ReviewWhereUniqueInput) {
    const deletedReview = await this.prisma.review.update({
      where: info,
      data: {
        status: E_status.DELETED,
      },
    });
    return deletedReview;
  }
}
