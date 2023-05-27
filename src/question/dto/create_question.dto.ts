import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { IsULID } from 'src/common/decorator/IsULID';

export class QuestionCreateInputDTO
  implements Omit<Prisma.QuestionUncheckedCreateInput, 'question_id'>
{
  @ApiProperty({
    name: 'course_id',
    description: '코스 id',
    type: 'string',
  })
  @IsULID()
  course_id: string;

  @ApiProperty({
    name: 'user_id',
    description: '유저 id',
    type: 'string',
  })
  @IsULID()
  user_id: string;

  @ApiProperty({
    name: 'title',
    description: '질문 제목',
    type: 'string',
  })
  @IsString()
  title: string;

  @ApiProperty({
    name: 'contents',
    description: '질문 내용',
    type: 'string',
  })
  @IsString()
  contents: string;
}
