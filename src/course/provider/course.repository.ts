import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseUpdateInputDTO } from '../dto/update_course.dto';

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

  async userCourseApply({ user_id, course_id }) {
    const newApply = await this.prisma.course.update({
      where: { course_id },
      data: {
        students: {
          create: {
            room_id: ulid(),
            student_id: user_id,
          },
        },
      },
    });
    return newApply;
  }

  async findOneCourse(info: Prisma.CourseWhereInput) {
    const course = await this.prisma.course.findFirst({ where: info });
    return course;
  }

  async getCourseList() {
    const courses = await this.prisma.course.findMany({
      where: {
        status: 'ACTIVE',
      },
    });
    return courses;
  }

  async getCourseListByUser({ user_id }) {
    const courses = await this.prisma.courseUserRoom.findMany({
      where: {
        student_id: user_id,
        status: 'ACTIVE',
      },
    });
    const courseInfos = [];
    for (const course of courses) {
      const courseInfo = await this.findOneCourse({
        course_id: course.course_id,
      });
      courseInfos.push(courseInfo);
    }
    return courseInfos;
  }
  async updateCourse(
    info: CourseUpdateInputDTO & Prisma.CourseWhereUniqueInput,
  ) {
    const { course_id, ...data } = info;
    const updatedCourse = await this.prisma.course.update({
      where: { course_id },
      data,
    });
    return updatedCourse;
  }

  async deleteStatusCourse(info: Prisma.CourseWhereUniqueInput) {
    const deletedCourse = await this.prisma.course.update({
      where: info,
      data: {
        status: E_status.DELETED,
      },
    });
    return deletedCourse;
  }
}
