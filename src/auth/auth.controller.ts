import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import * as express from 'express';
import { Public } from '../common/decorator/skip-auth.decorator';
import { LocalAuthGuard } from '../common/guard/localAuth.guard';
import { BaseResponse } from '../common/util/res/BaseResponse';
import { baseResponeStatus } from '../common/util/res/baseStatusResponse';
import { UserCreateInputDTO } from '../user/dto/create_user.dto';
import { LoginInputDTO } from '../user/dto/login_user.dto';
import { AuthService } from './provider/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards()
  @Post('/signup')
  async createUser(@Body() userInputDTO: UserCreateInputDTO) {
    const result = await this.authService.createUser(userInputDTO);
    return new BaseResponse(baseResponeStatus.SUCCESS, result);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() loginInputDTO: LoginInputDTO,
    @Res({ passthrough: true }) res: express.Response, //Response 오류
  ) {
    const token = await this.authService.login(loginInputDTO);
    res.cookie('Authentication', token, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
  }

  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: express.Response) {
    const { token, ...option } = await this.authService.logOut();
    res.cookie('Authentication', token, option);
  }
}
