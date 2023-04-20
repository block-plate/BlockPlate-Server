import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { baseResponeStatus } from '../../common/util/res/baseStatusResponse';
import { LectureRepository } from '../../lecture/provider/lecture.repository';
import { UserRepository } from '../../user/provider/user.repository';
import { CommentCreateInputDTO } from '../dto/create_comment.dto';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly lectureRepo: LectureRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async createComment(info: CommentCreateInputDTO) {
    const { lecture_id, user_id } = info;
    const lectureExist = await this.lectureRepo.findOneLecture({ lecture_id });
    if (!lectureExist)
      throw new BadRequestException(baseResponeStatus.LECTURE_NOT_EXIST);
    const userExist = await this.userRepo.findOneUser({ user_id });
    if (!userExist)
      throw new BadRequestException(baseResponeStatus.USER_NOT_EXIST);

    const newComment = await this.commentRepo.createComment(info);
    return newComment;
  }

  async deleteStatusComment(info: Prisma.CommentWhereUniqueInput) {
    const exist = await this.commentRepo.findOneComment(info);
    if (!exist)
      throw new BadRequestException(baseResponeStatus.COMMENT_NOT_EXIST);

    const deletedComment = await this.commentRepo.deleteStatusComment(info);
    return deletedComment;
  }
}
