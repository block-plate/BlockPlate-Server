import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { CourseRepository } from '../../course/provider/course.repository';
import { LectureCreateInputDTO } from '../dto/create_lecture.dto';
import { LectureUpdateInputDTO } from '../dto/update_lecture.dto';
import { LectureRepository } from './lecture.repository';

@Injectable()
export class LectureService {
  constructor(
    private readonly lectureRepo: LectureRepository,
    private readonly courseRepo: CourseRepository,
  ) {}

  async createLecture(info: LectureCreateInputDTO) {
    const { course_id } = info;
    const courseExist = await this.courseRepo.findOneCourse({
      course_id,
    });
    if (!courseExist)
      throw new BadRequestException(baseResponeStatus.COURSE_NOT_EXIST);

    const newLecture = await this.lectureRepo.createLecture(info);
    return newLecture;
  }

  async getLectureList({ course }: { course: string }) {
    const course_id = course;
    const courseExist = await this.courseRepo.findOneCourse({
      course_id,
    });
    if (!courseExist)
      throw new BadRequestException(baseResponeStatus.COURSE_NOT_EXIST);
    const lectures = await this.lectureRepo.getLectureList({ course });
    return lectures;
  }

  async updateLecture(
    info: LectureUpdateInputDTO & Prisma.LectureWhereUniqueInput,
  ) {
    const { lecture_id } = info;
    const lectureExist = await this.lectureRepo.findOneLecture({
      lecture_id,
    });
    if (!lectureExist)
      throw new BadRequestException(baseResponeStatus.LECTURE_NOT_EXIST);
    const updatedLecture = await this.lectureRepo.updateLecture(info);
    return updatedLecture;
  }

  async deleteStatusLecture(info: Prisma.LectureWhereUniqueInput) {
    const exist = await this.lectureRepo.deleteStatusLecture(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.LECTURE_NOT_EXIST);
    const deletedLecture = await this.lectureRepo.deleteStatusLecture(info);
    return deletedLecture;
  }
}
