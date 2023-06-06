import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CourseController } from './course.controller';
import { CourseRepository } from './provider/course.repository';
import { CourseService } from './provider/course.service';

@Module({
  imports: [UserModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseRepository, CourseService],
})
export class CourseModule {}
