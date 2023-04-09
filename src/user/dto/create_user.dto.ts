import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { E_UserType } from '../interface/user_type.enum';

export class UserCreateInputDTO
  implements Omit<Prisma.UserUncheckedCreateInput, 'user_id'>
{
  @ApiProperty({
    name: 'email',
    description: '이메일',
    type: 'string',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    name: 'pwd',
    description: '비밀번호',
    type: 'string',
  })
  @IsString()
  pwd: string;

  @ApiProperty({
    name: 'name',
    description: '이름',
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'type',
    description: '유저타입(',
    type: 'E_UserType',
  })
  @IsNumber()
  @IsEnum(E_UserType)
  type: number;
}
