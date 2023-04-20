import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { CourseRepository } from '../../course/provider/course.repository';
import { UserRepository } from '../../user/provider/user.repository';
import { ReviewCreateInputDTO } from '../dto/create_review.dto';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepo: ReviewRepository,
    private readonly courseRepo: CourseRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async createReview(info: ReviewCreateInputDTO) {
    const { course_id, user_id } = info;
    const courseExist = await this.courseRepo.findOneCourse({
      course_id,
    });
    if (!courseExist)
      throw new BadRequestException(baseResponeStatus.COURSE_NOT_EXIST);
    const userExist = await this.userRepo.findOneUser({
      user_id,
    });
    if (!userExist)
      throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);

    const newReview = await this.reviewRepo.createReview(info);
    return newReview;
  }

  async deleteStatusReview(info: Prisma.ReviewWhereUniqueInput) {
    const exist = await this.reviewRepo.findOneReview(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.REVIEW_NOT_EXIST);

    const deletedReview = await this.reviewRepo.deleteStatusReview(info);
    return deletedReview;
  }
}
