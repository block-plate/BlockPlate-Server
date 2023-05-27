import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { IsULID } from 'src/common/decorator/IsULID';

export class AnswerCreateInputDTO
  implements Omit<Prisma.AnswerUncheckedCreateInput, 'answer_id'>
{
  @ApiProperty({
    name: 'question_id',
    description: '질문 id',
    type: 'string',
  })
  @IsULID()
  question_id: string;

  @ApiProperty({
    name: 'user_id',
    description: '답변 user id',
    type: 'string',
  })
  @IsULID()
  user_id: string;

  @ApiProperty({
    name: 'contents',
    description: '답변 내용',
    type: 'string',
  })
  @IsString()
  contents: string;
}
