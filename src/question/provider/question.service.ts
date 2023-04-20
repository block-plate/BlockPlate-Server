import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { CourseRepository } from '../../course/provider/course.repository';
import { UserRepository } from '../../user/provider/user.repository';
import { QuestionCreateInputDTO } from '../dto/create_question.dto';
import { QuestionUpdateInputDTO } from '../dto/update_question.dto';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepo: QuestionRepository,
    private readonly courseRepo: CourseRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async createQuestion(info: QuestionCreateInputDTO) {
    const { course_id, user_id } = info;
    const courseExist = await this.courseRepo.findOneCourse({
      course_id,
    });
    if (!courseExist)
      throw new BadRequestException(baseResponeStatus.COURSE_NOT_EXIST);
    const userExist = await this.userRepo.findOneUser({
      user_id,
    });
    if (!userExist)
      throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);

    const newQuestion = await this.questionRepo.createQuestion(info);
    return newQuestion;
  }
  async getQuestion(info: Prisma.QuestionWhereUniqueInput) {
    const exist = await this.questionRepo.findOneQuestion(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.QUESTION_NOT_EXIST);
    return exist;
  }

  async updateQuestion(
    info: QuestionUpdateInputDTO & Prisma.QuestionWhereUniqueInput,
  ) {
    const { question_id } = info;
    const questionExist = await this.questionRepo.findOneQuestion({
      question_id,
    });
    if (!questionExist)
      throw new BadRequestException(baseResponeStatus.QUESTION_NOT_EXIST);

    const updatedQuestion = await this.questionRepo.updateQuestion(info);
    return updatedQuestion;
  }

  async deleteStatusQuestion(info: Prisma.QuestionWhereUniqueInput) {
    const exist = await this.questionRepo.findOneQuestion(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.QUESTION_NOT_EXIST);

    const deletedQuestion = await this.questionRepo.deleteStatusQuestion(info);
    return deletedQuestion;
  }
}
