import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestion(
    info: Omit<Prisma.QuestionUncheckedCreateInput, 'question_id'>,
  ) {
    const newQuestion = await this.prisma.question.create({
      data: {
        question_id: ulid(),
        ...info,
      },
    });
    return newQuestion;
  }
  async findOneQuestion(info: Prisma.QuestionWhereInput) {
    const question = await this.prisma.question.findFirst({ where: info });
    return question;
  }
}
