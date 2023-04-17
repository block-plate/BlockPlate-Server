import { Module } from '@nestjs/common';
import { CommentService } from './provider/comment.service';

@Module({
  providers: [CommentService],
})
export class CommentModule {}
