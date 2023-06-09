import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnswerModule } from './answer/answer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { configOption } from './common/options/config.option';
import { CourseModule } from './course/course.module';
import { LectureModule } from './lecture/lecture.module';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionModule } from './question/question.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { MineModule } from './mine/mine.module';

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
    PaymentModule,
    MineModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    //{ provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
