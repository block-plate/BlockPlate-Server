import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { float } from 'aws-sdk/clients/cloudfront';
import { IsNumber, IsString } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';

export class CourseCreateInputDTO
  implements Omit<Prisma.CourseUncheckedCreateInput, 'course_id'>
{
  @ApiProperty({
    name: 'title',
    description: '코스제목',
    type: 'string',
  })
  @IsString()
  title: string;

  @ApiProperty({
    name: 'amount',
    description: '코스가격',
    type: 'float',
  })
  @IsNumber()
  amount: float;

  @ApiProperty({
    name: 'description',
    description: '코스 설명',
    type: 'string',
  })
  @IsString()
  description: string;

  @ApiProperty({
    name: 'instructor_id',
    description: '강사 유저 아이디',
    type: 'string',
  })
  @IsULID()
  instructor_id: string;
}
