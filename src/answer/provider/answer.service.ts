import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { QuestionRepository } from '../../question/provider/question.repository';
import { UserRepository } from '../../user/provider/user.repository';
import { AnswerCreateInputDTO } from '../dto/create_answer.dto';
import { AnswerUpdateInputDTO } from '../dto/update_answer.dto';
import { AnswerRepository } from './answer.repository';

@Injectable()
export class AnswerService {
  constructor(
    private answerRepo: AnswerRepository,
    private questionRepo: QuestionRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async createAnswer(info: AnswerCreateInputDTO) {
    const { question_id, user_id } = info;
    const questionExist = await this.questionRepo.findOneQuestion({
      question_id,
    });
    if (!questionExist)
      throw new BadRequestException(baseResponeStatus.QUESTION_NOT_EXIST);
    const userExist = await this.userRepo.findOneUser({
      user_id,
    });
    if (!userExist)
      throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);
    const newAnswer = await this.answerRepo.createAnswer(info);
    return newAnswer;
  }

  async getAnswerList({ question }: { question: string }) {
    const question_id = question;

    const questionExist = await this.questionRepo.findOneQuestion({
      question_id,
    });
    if (!questionExist)
      throw new BadRequestException(baseResponeStatus.QUESTION_NOT_EXIST);

    const answers = await this.answerRepo.getAnswerList({ question });
    return answers;
  }

  async updateAnswer(
    info: AnswerUpdateInputDTO & Prisma.AnswerWhereUniqueInput,
  ) {
    const { answer_id } = info;
    const answerExist = await this.answerRepo.findOneAnswer({
      answer_id,
    });
    if (!answerExist)
      throw new BadRequestException(baseResponeStatus.ANSWER_NOT_EXIST);

    const updatedAnswer = await this.answerRepo.updateAnswer(info);
    return updatedAnswer;
  }

  async deleteStatusAnswer(info: Prisma.AnswerWhereUniqueInput) {
    const exist = await this.answerRepo.findOneAnswer(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.ANSWER_NOT_EXIST);

    const deletedAnswer = await this.answerRepo.deleteStatusAnswer(info);
    return deletedAnswer;
  }
}
