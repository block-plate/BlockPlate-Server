import { Module } from '@nestjs/common';
import { QuestionModule } from '../question/question.module';
import { UserModule } from '../user/user.module';
import { AnswerController } from './answer.controller';
import { AnswerRepository } from './provider/answer.repository';
import { AnswerService } from './provider/answer.service';

@Module({
  imports: [QuestionModule, UserModule],
  providers: [AnswerService, AnswerRepository],
  controllers: [AnswerController],
})
export class AnswerModule {}
