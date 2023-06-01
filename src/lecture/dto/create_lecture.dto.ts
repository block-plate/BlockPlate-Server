import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';

export class LectureCreateInputDTO
  implements Omit<Prisma.LectureUncheckedCreateInput, 'lecture_id'>
{
  @ApiProperty({
    name: 'course_id',
    description: '코스 id',
    type: 'string',
  })
  @IsULID()
  course_id: string;

  @ApiProperty({
    name: 'title',
    description: '강의 제목',
    type: 'string',
  })
  @IsString()
  title: string;

  @ApiProperty({
    name: 'url',
    description: '강의 url',
    type: 'string',
  })
  @IsString()
  url: string;

  @ApiProperty({
    name: 'group',
    description: '강의 그룹',
    type: 'string',
  })
  @IsString()
  group: string;

  @ApiProperty({
    name: 'order',
    description: '순서',
    type: 'number',
  })
  @IsNumber()
  order: number;

  @ApiProperty({
    name: 'data',
    description: '강의 내용',
    type: 'string',
  })
  @IsString()
  data: string;
}
