import { Module } from '@nestjs/common';
import { LectureModule } from '../lecture/lecture.module';
import { UserModule } from '../user/user.module';
import { CommentController } from './comment.controller';
import { CommentRepository } from './provider/comment.repository';
import { CommentService } from './provider/comment.service';

@Module({
  imports: [LectureModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
