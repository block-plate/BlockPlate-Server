import { Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { CourseRepository } from '../../course/provider/course.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRepository } from '../../user/provider/user.repository';
import { paymentData } from '../interface/paymentData.interface';

@Injectable()
export class PaymentRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courseRepo: CourseRepository,
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
}
