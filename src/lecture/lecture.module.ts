import { Module } from '@nestjs/common';
import { CourseModule } from '../course/course.module';
import { LectureController } from './lecture.controller';
import { LectureRepository } from './provider/lecture.repository';
import { LectureService } from './provider/lecture.service';

@Module({
  imports: [CourseModule],
  controllers: [LectureController],
  providers: [LectureService, LectureRepository],
  exports: [LectureRepository],
})
export class LectureModule {}
