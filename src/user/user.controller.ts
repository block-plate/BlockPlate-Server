import { Body, Controller, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserCreateInputDTO } from './dto/create_user.dto';

@ApiExtraModels(UserCreateInputDTO)
@ApiTags('User API')
@Controller('users')
export class UserController {
  @Post('/')
  async createUser(@Body() userInputDTO: UserCreateInputDTO) {
    console.log('!');
  }
}
