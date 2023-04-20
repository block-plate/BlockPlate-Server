import { PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { LectureCreateInputDTO } from './create_lecture.dto';

export class LectureUpdateInputDTO
  extends PartialType(LectureCreateInputDTO)
  implements Prisma.LectureUpdateInput
{
  @IsOptional()
  title?: string;
  data?: string;
}
