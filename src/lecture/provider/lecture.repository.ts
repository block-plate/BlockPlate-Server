import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../prisma/prisma.service';
import { LectureUpdateInputDTO } from '../dto/update_lecture.dto';

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

  async findOneLecture(info: Prisma.LectureWhereInput) {
    const lecture = await this.prisma.lecture.findFirst({ where: info });
    return lecture;
  }

  async updateLecture(
    info: LectureUpdateInputDTO & Prisma.LectureWhereUniqueInput,
  ) {
    const { lecture_id, ...data } = info;
    const updatedLecture = await this.prisma.lecture.update({
      where: { lecture_id },
      data,
    });
    return updatedLecture;
  }

  async deleteStatusLecture(info: Prisma.LectureWhereUniqueInput) {
    const deletedLecture = await this.prisma.lecture.update({
      where: info,
      data: {
        status: E_status.DELETED,
      },
    });
    return deletedLecture;
  }
}
