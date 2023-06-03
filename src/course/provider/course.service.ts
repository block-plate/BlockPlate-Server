import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { UserRepository } from '../../user/provider/user.repository';
import { CourseCreateInputDTO } from '../dto/create_course.dto';
import { CourseUpdateInputDTO } from '../dto/update_course.dto';
import { userCourseApplyQuery } from '../interface/userCourseApplyQuery.interface';
import { CourseRepository } from './course.repository';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepo: CourseRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async createCourse(info: CourseCreateInputDTO) {
    const { instructor_id } = info;
    const user_id = instructor_id;
    const userExist = await this.userRepo.findOneUser({
      user_id,
    });
    if (!userExist)
      throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);
    const checkUser = await this.userRepo.checkUserType({ user_id });
    if (!checkUser)
      throw new BadRequestException(baseResponeStatus.NOT_INSTRUCTOR);

    const newCourse = await this.courseRepo.createCourse(info);
    return newCourse;
  }

  async findOneCourse(info: Prisma.CourseWhereUniqueInput) {
    const exist = await this.courseRepo.findOneCourse(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.COURSE_NOT_EXIST);
    return exist;
  }

  async updateCourse(
    info: CourseUpdateInputDTO & Prisma.CourseWhereUniqueInput,
  ) {
    const { course_id } = info;
    const courseExist = await this.courseRepo.findOneCourse({
      course_id,
    });
    if (!courseExist)
      throw new BadRequestException(baseResponeStatus.COURSE_NOT_EXIST);

    const updatedCourse = await this.courseRepo.updateCourse(info);
    return updatedCourse;
  }

  async getCourseList() {
    const courses = await this.courseRepo.getCourseList();
    return courses;
  }

  async getCourseListByUser({ user_id }) {
    const userExist = await this.userRepo.findOneUser({
      user_id,
    });
    if (!userExist)
      throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);
    return await this.courseRepo.getCourseListByUser({ user_id });
  }

  async deleteStatusCourse(info: Prisma.CourseWhereUniqueInput) {
    const exist = await this.courseRepo.findOneCourse(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.COURSE_NOT_EXIST);
    const deletedCourse = await this.courseRepo.deleteStatusCourse(info);
    return deletedCourse;
  }

  async userCourseApply({ user, course }: userCourseApplyQuery) {
    const user_id =
      user && user === 'all' ? undefined : user ? user : undefined;
    const course_id =
      course && course === 'all' ? undefined : course ? course : undefined;
    const userExist = await this.userRepo.findOneUser({
      user_id,
    });
    if (!userExist)
      throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);
    const checkUser = await this.userRepo.checkUserType({ user_id });
    if (checkUser) throw new BadRequestException(baseResponeStatus.NOT_STUDENT);
    const exist = await this.courseRepo.findOneCourse({ course_id });
    if (!exist)
      throw new BadRequestException(baseResponeStatus.COURSE_NOT_EXIST);
    //console.log(user_id, course_id);

    return await this.courseRepo.userCourseApply({
      user_id,
      course_id,
    });
  }
}
