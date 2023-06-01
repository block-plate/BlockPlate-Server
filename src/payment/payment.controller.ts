import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { BaseResponse } from '../common/util/res/BaseResponse';
import { baseResponeStatus } from '../common/util/res/baseStatusResponse';
import { CourseRepository } from '../course/provider/course.repository';
import { UserRepository } from '../user/provider/user.repository';
import { createInputPayment } from './interface/createInputPayment.interface';
import { PaymentService } from './provider/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly courseRepo: CourseRepository,
    private readonly userRepo: UserRepository,
  ) {}

  @Post('/:course_id')
  async createPayment(
    @Param('course_id') course_id: string,
    @Body() body: createInputPayment,
  ) {
    const courseExist = await this.courseRepo.findOneCourse({ course_id });
    if (!courseExist)
      throw new BadRequestException(baseResponeStatus.COURSE_NOT_EXIST);
    const paymentData = {
      ...body,
      course_id: course_id,
    };
    const result = await this.paymentService.createPayment(paymentData);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
  /*
  @Get('/:user_id')
  async getPayments(@Param('user_id') user_id: string) {
    const userExist = await this.userRepo.findOneUser({user_id})
  }
  */
}
