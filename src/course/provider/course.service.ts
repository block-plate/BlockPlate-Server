import { BadRequestException, Injectable } from '@nestjs/common';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { UserRepository } from '../../user/provider/user.repository';
import { CourseCreateInputDTO } from '../dto/create_course.dto';
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
}
