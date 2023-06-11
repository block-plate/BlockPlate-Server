import { PartialType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { CourseCreateInputDTO } from './create_course.dto';

export class CourseUpdateInputDTO
  extends PartialType(CourseCreateInputDTO)
  implements Prisma.CourseUpdateInput
{
  @IsOptional()
  title?: string;

  @IsOptional()
  tags?: string;

  @IsOptional()
  amount?: number;

  @IsOptional()
  description?: string;

  @IsOptional()
  data?: string;

  @IsOptional()
  instructor_id?: string;
}
