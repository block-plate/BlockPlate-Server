import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../common/guard/localAuth.guard';
import { BaseResponse } from '../common/util/res/BaseResponse';
import { baseResponeStatus } from '../common/util/res/baseStatusResponse';
import { UserCreateInputDTO } from '../user/dto/create_user.dto';
import { LoginInputDTO } from '../user/dto/login_user.dto';
import { AuthService } from './provider/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/signup')
  async createUser(@Body() userInputDTO: UserCreateInputDTO) {
    const result = await this.authService.createUser(userInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginInputDTO: LoginInputDTO) {
    return this.authService.validateUser(loginInputDTO);
  }
}
