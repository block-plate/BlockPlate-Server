import { Injectable } from '@nestjs/common';
import { E_status, Prisma } from '@prisma/client';
import { ulid } from 'ulid';
import { PrismaService } from '../../prisma/prisma.service';
import { QuestionUpdateInputDTO } from '../dto/update_question.dto';

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

  async getQuestionList({ user, course }: { user: string; course: string }) {
    const user_id =
      user && user === 'all' ? undefined : user ? user : undefined;
    const course_id =
      course && course === 'all' ? undefined : course ? course : undefined;
    const questions = await this.prisma.question.findMany({
      where: { user_id, course_id, status: 'ACTIVE' },
    });
    return questions;
  }

  async updateQuestion(
    info: QuestionUpdateInputDTO & Prisma.QuestionWhereUniqueInput,
  ) {
    const { question_id, ...data } = info;
    const updatedQuestion = await this.prisma.question.update({
      where: { question_id },
      data,
    });
    return updatedQuestion;
  }

  async deleteStatusQuestion(info: Prisma.QuestionWhereUniqueInput) {
    const deletedQuestion = await this.prisma.question.update({
      where: info,
      data: {
        status: E_status.DELETED,
      },
    });
    return deletedQuestion;
  }
}
