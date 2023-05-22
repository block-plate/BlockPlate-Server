import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginInputDTO {
  @ApiProperty({
    name: 'email',
    description: '이메일',
    type: 'string',
    required: true,
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'pwd',
    description: '비밀번호',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  pwd: string;
}
