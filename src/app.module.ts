import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configOption } from './common/options/config.option';
import { PrismaModule } from './prisma/prisma.module';

import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';
import { LectureModule } from './lecture/lecture.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(configOption),
    UserModule,
    CourseModule,
    LectureModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
