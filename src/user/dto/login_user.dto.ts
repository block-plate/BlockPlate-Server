import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginInputDTO {
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
}
