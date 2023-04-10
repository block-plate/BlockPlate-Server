import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(
    info: Omit<Prisma.CourseUncheckedCreateInput, 'course_id'>,
  ) {
    const newCourse = await this.prisma.course.create({
      data: {
        course_id: ulid(),
        ...info,
      },
    });
    return newCourse;
  }
}
