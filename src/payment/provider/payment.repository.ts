import { BadRequestException, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { BaseResponse } from '../../common/util/res/BaseResponse';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { CourseRepository } from '../../course/provider/course.repository';
import { CourseService } from '../../course/provider/course.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRepository } from '../../user/provider/user.repository';
import { paymentData } from '../interface/paymentData.interface';

@Injectable()
export class PaymentRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courseRepo: CourseRepository,
    private readonly courseService: CourseService,
    private readonly userRepo: UserRepository,
  ) {}

  async createPayment(info: paymentData) {
    const { course_id } = info;
    const course = await this.courseRepo.findOneCourse({ course_id });
    const user_id = course.instructor_id; //course instructor id
    const instructor = await this.userRepo.findOneUser({ user_id });
    const newPayment = await this.prisma.payment.create({
      data: {
        payment_id: ulid(),
        ...info,
        amount: course.amount,
        instructor_account: instructor.account,
      },
    });
    return newPayment;
  }

  async getPaymentsByUser(user_id) {
    const payments = await this.prisma.payment.findMany({
      where: {
        user_id: user_id,
      },
    });
    return payments;
  }

  async verifyAndUpdatePayments(transactions) {
    for (const transaction of transactions) {
      console.log(transaction.hash);

      const payment = await this.prisma.payment.findUnique({
        where: { tx_id: transaction.hash },
      });
      if (!payment) {
        //없으면
        console.log('payment not exist');
        continue;
      }
      /*
      for (const txIn of t.txIns) {
        const payment = await this.prisma.payment.findUnique({
          where: { tx_id: txIn.txOutId },
        });      
        */
      // instructor account를 찾고, amount가 강의의 amount와 같은지 확인
      for (const txOut of transaction.txOuts) {
        if (txOut.amount < payment.amount) {
          await this.prisma.payment.update({
            where: { payment_id: payment.payment_id },
            data: {
              amountError: true,
            },
          });
          //throw new BadRequestException(baseResponeStatus.MINE_AMOUNT_ERROR);
          continue;
        }
        if (
          txOut.account === payment.instructor_account &&
          txOut.amount === payment.amount &&
          !payment.isSpend
        ) {
          //!isSpend 추가
          // 확인되면 해당 payment DB is_spend 필드를 true로 변경
          await this.prisma.payment.update({
            where: { payment_id: payment.payment_id },
            data: { isSpend: true, amountError: false },
          });
          //console.log('코스 추가');

          //payment 디비에서 돈을 지불한 사람에게 코스 추가해줌
          const user = payment.user_id;
          const course = payment.course_id;
          //console.log(user, course);

          //const query: userCourseApplyQuery = { user, course };
          if (!user || !course)
            throw new BadRequestException('user_id,course_id are all needed');
          const result = await this.courseService.userCourseApply({
            user,
            course,
          });
          return new BaseResponse(baseResponeStatus.SUCCESS, result);
        }
      }
    }
    throw new BadRequestException('payment not exist');
  }
}
