import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './provider/payment.repository';
import { PaymentService } from './provider/payment.service';

@Module({
  imports: [UserModule, CourseModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
