import { Module } from '@nestjs/common';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { QuestionRepository } from './provider/question.repository';
import { QuestionService } from './provider/question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [CourseModule, UserModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
  exports: [QuestionRepository],
})
export class QuestionModule {}
