import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configOption } from './common/options/config.option';
import { PrismaModule } from './prisma/prisma.module';

import { CommentModule } from './comment/comment.module';
import { CourseModule } from './course/course.module';
import { LectureModule } from './lecture/lecture.module';
import { QuestionModule } from './question/question.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { AnswerModule } from './answer/answer.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(configOption),
    UserModule,
    CourseModule,
    LectureModule,
    CommentModule,
    ReviewModule,
    QuestionModule,
    AnswerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
