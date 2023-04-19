import { Module } from '@nestjs/common';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { ReviewRepository } from './provider/review.repository';
import { ReviewService } from './provider/review.service';
import { ReviewController } from './review.controller';

@Module({
  imports: [CourseModule, UserModule],
  providers: [ReviewService, ReviewRepository],
  controllers: [ReviewController],
})
export class ReviewModule {}
