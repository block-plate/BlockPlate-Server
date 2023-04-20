import { PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { QuestionCreateInputDTO } from './create_question.dto';

export class QuestionUpdateInputDTO
  extends PartialType(QuestionCreateInputDTO)
  implements Prisma.QuestionUpdateInput
{
  @IsOptional()
  title?: string;

  @IsOptional()
  contents?: string;
}
