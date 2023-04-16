import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LectureRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createLecture(
    info: Omit<Prisma.LectureUncheckedCreateInput, 'lecture_id'>,
  ) {
    const newLecture = await this.prisma.lecture.create({
      data: {
        lecture_id: ulid(),
        ...info,
      },
    });
    return newLecture;
  }
}
