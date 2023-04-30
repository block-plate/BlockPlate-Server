import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '../common/util/res/BaseResponse';
import { baseResponeStatus } from '../common/util/res/baseStatusResponse';
import { UserCreateInputDTO } from './dto/create_user.dto';
import { UserService } from './provider/user.service';

@ApiExtraModels(UserCreateInputDTO)
@ApiTags('User API')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/')
  async createUser(@Body() userInputDTO: UserCreateInputDTO) {
    const result = await this.userService.createUser(userInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Get('/')
  async getUserList() {
    const result = await this.userService.getUserList();
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }
}
