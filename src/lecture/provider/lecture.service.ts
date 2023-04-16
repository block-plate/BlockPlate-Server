import { BadRequestException, Injectable } from '@nestjs/common';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { CourseRepository } from '../../course/provider/course.repository';
import { LectureCreateInputDTO } from '../dto/create_lecture.dto';
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
}
