import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { IsULID } from '../../common/decorator/IsULID';

export class CommentCreateInputDTO
  implements Omit<Prisma.CommentUncheckedCreateInput, 'comment_id'>
{
  @ApiProperty({
    name: 'lecture_id',
    description: '강의 id',
    type: 'string',
  })
  @IsULID()
  lecture_id: string;

  @ApiProperty({
    name: 'user_id',
    description: '유저 id',
    type: 'string',
  })
  @IsULID()
  user_id: string;

  @ApiProperty({
    name: 'contents',
    description: 'comment 내용',
    type: 'string',
  })
  @IsString()
  contents: string;
}
