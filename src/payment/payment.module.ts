import { Module } from '@nestjs/common';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './provider/payment.repository';
import { PaymentService } from './provider/payment.service';

@Module({
  imports: [UserModule, CourseModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
  exports: [PaymentRepository],
})
export class PaymentModule {}
